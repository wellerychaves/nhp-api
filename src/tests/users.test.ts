import { describe, expect, test } from "bun:test";
import app from "../app";
import type { IUser } from "../interfaces/user.interface";

describe("User Route Tests", () => {
	let userId: string;

	test("POST /users - Create a user", async () => {
		const testUser = {
			userName: "Test",
			email: "test@mail.com",
			password: "TestPassword123",
		};

		const res = await app.request("/users", {
			method: "POST",
			body: JSON.stringify(testUser),
			headers: { "Content-Type": "application/json" },
		});
		const users = (await res.json()) as IUser[];
		const user: IUser = users[0];
		userId = user.id;

		expect(res.status).toBe(201);
		expect(user.email).toBe("test@mail.com");
	});

	test("GET /users - List all users", async () => {
		const res = await app.request("/users");
		expect(res.status).toBe(200);
	});

	test("DELETE /users/:id - Delete a user", async () => {
		const res = await app.request(`/users/${userId}`, {
			method: "DELETE",
		});
		expect(res.status).toBe(200);

		const resBody = await res.json();
		expect(resBody).toEqual({ message: "User Deleted" });

		const checkRes = await app.request(`/users/${userId}`);
		expect(checkRes.status).toBe(404);
	});
	/* const deleteUser = async (userId: string) => {
		await app.request(`/users/${userId}`, {
			method: "DELETE",
		});
	};
	afterEach(async () => {
		if (userId) {
			await deleteUser(userId);
		}
	}); */
});
