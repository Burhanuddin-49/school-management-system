import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock user database (In a real app, use a database)
const users = [
  { id: 1, username: "admin", password: "password123" },
  { id: 2, username: "teacher", password: "password456" },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Find the user matching the username and password
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "9ca64dab6f1fe59e9e15c8d3a5ae443f3856e1ff13cd34855f7ced932e404451", // Use environment variable for JWT secret
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Send the token as an HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      path: "/", // Cookie will be available for the entire domain
      maxAge: 3600, // Token expires in 1 hour
    });

    return response;
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
