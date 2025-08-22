from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # This tells Pydantic to load variables from a .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Define the settings you want to load
    DATABASE_URL: str

# Create a single, reusable instance of the settings
settings = Settings()