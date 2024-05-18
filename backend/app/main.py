from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import schemas, models, utils
from .database import SessionLocal, engine, Base
from .auth_bearer import JWTBearer

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@app.post("/register", response_model=schemas.UserOut)
def register_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(models.User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = utils.hash_password(user.password)
    
    new_user = models.User(
        role=user.role,
        name=user.name,
        username=user.username,
        email=user.email,
        password=hashed_password,
        phone_number=user.phone_number,
        nationality=user.nationality,
        company_name=user.company_name,
        address=user.address
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user

@app.post('/login', response_model=schemas.Token)
def login(request: schemas.Login, db: Session = Depends(get_session)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or not utils.verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")

    access_token = utils.create_access_token(user.id)
    refresh_token = utils.create_refresh_token(user.id)

    token_entry = models.TokenTable(
        user_id=user.id,
        access_token=access_token,
        refresh_token=refresh_token
    )

    db.add(token_entry)
    db.commit()
    db.refresh(token_entry)

    return {"access_token": access_token, "refresh_token": refresh_token}

@app.get('/users', response_model=list[schemas.UserOut], dependencies=[Depends(JWTBearer())])
def get_users(session: Session = Depends(get_session)):
    users = session.query(models.User).all()
    return users

@app.post('/change-password')
def change_password(request: schemas.ChangePassword, db: Session = Depends(get_session)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or not utils.verify_password(request.old_password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")

    user.password = utils.hash_password(request.new_password)
    db.commit()
    
    return {"message": "Password changed successfully"}

@app.post('/logout')
def logout(token: str = Depends(JWTBearer()), db: Session = Depends(get_session)):
    payload = utils.decode_jwt(token)
    user_id = payload['sub']
    
    token_record = db.query(models.TokenTable).filter(
        models.TokenTable.user_id == user_id, 
        models.TokenTable.access_token == token
    ).first()

    if token_record:
        token_record.status = False
        db.add(token_record)
        db.commit()
        db.refresh(token_record)
    
    return {"message": "Logout successful"}
