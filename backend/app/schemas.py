from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    role: str
    name: str
    username: str
    email: EmailStr
    password: str
    phone_number: Optional[str] = None
    nationality: Optional[str] = None
    company_name: Optional[str] = None
    address: Optional[str] = None

class UserOut(BaseModel):
    id: int
    role: str
    name: str
    username: str
    email: EmailStr
    phone_number: Optional[str] = None
    nationality: Optional[str] = None
    company_name: Optional[str] = None
    address: Optional[str] = None

    class Config:
        form_attribute = True

class Token(BaseModel):
    access_token: str
    refresh_token: str

class TokenData(BaseModel):
    email: Optional[str] = None

class Login(BaseModel):
    email: EmailStr
    password: str

class ChangePassword(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str
