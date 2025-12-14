from pydantic import BaseModel


class RawProduct(BaseModel):
    image_url: str
    image_author: str
    image_author_url: str
    category: str
