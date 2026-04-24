class NotFoundError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class AlreadyExistsError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class AuthenticationError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class ExternalServiceError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class DatabaseError(Exception):
    def __init__(self, message: str):
        self.message = message
        super().__init__(message)
