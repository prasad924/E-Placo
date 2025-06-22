"use client";

import api from "@/lib/api";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await api.post(
        "/auth/login",
        { id, password, role, rememberMe },
        { withCredentials: true }
      );

      const { message, user } = res.data;

      if (message === "Successfully logged in") {
        setUser(user);
        router.replace(`/${user.role}/dashboard`);
      } else {
        setErrorMessage("Unexpected response.");
      }
    } catch (err) {
      console.log(err);
      const errMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <h2 className="text-3xl font-semibold text-center">Login</h2>

          <div className="space-y-2">
            <Label htmlFor="id">Employee/Student ID</Label>
            <Input
              id="id"
              type="id"
              placeholder="Ex: 23BD5A0518"
              value={id}
              maxLength={10}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* <div
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-muted-foreground hover:underline cursor-pointer"
              >
                Forgot password?
              </div> */}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Login as</Label>
            <RadioGroup
              defaultValue="student"
              onValueChange={setRole}
              className="flex flex-col space-y-1"
            >
              {/* {["student", "admin", "recruiter"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="font-normal capitalize">
                    {type}
                  </Label>
                </div>
              ))} */}
               {["student", "admin"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="font-normal capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2 pb-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(val) => setRememberMe(val)}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me for 30 days
            </Label>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </CardFooter>
      </form>

      {errorMessage && (
        <div className="text-center text-sm text-red-600 mt-2">
          {errorMessage}
        </div>
      )}
    </Card>
  );
}
