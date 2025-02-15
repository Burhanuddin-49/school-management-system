import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// This is a mock user database. In a real application, you would use a proper database.
const users = [
  { id: 1, username: "admin", password: "password123" },
  { id: 2, username: "teacher", password: "password456" },
]

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, "your-secret-key", {
      expiresIn: "1h",
    })

    return NextResponse.json({ token })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}

