interface User {
    email: string
    role: string
}

interface RequestWithUser extends Request{
    user: User
}