from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import (
    NotFoundError,
    AlreadyExistsError,
    AuthenticationError,
    ExternalServiceError,
)

def register_exception_handlers(app):
  @app.exception_handler(NotFoundError)
  async def not_found_handler(request: Request, exc: NotFoundError):
      return JSONResponse(status_code=404, content={"error": exc.message})

  @app.exception_handler(AlreadyExistsError)
  async def already_exists_handler(request: Request, exc: AlreadyExistsError):
      return JSONResponse(status_code=400, content={"error": exc.message})

  @app.exception_handler(AuthenticationError)
  async def auth_error_handler(request: Request, exc: AuthenticationError):
      return JSONResponse(status_code=401, content={"error": exc.message})

  @app.exception_handler(Exception)
  async def generic_error_handler(request: Request, exc: Exception):
      return JSONResponse(status_code=500, content={"error": "Internal server error"})

  @app.exception_handler(ExternalServiceError)
  async def external_service_error_handler(request: Request, exc: ExternalServiceError):
      return JSONResponse(status_code=503, content={"error": exc.message})