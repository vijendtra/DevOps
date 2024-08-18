import supertest from "supertest";
import server from "../server";

describe("GET /api/v1/", () => {
    it("should return 200 OK", async () => {
        const result = await supertest(server).get("/api/v1/");
        expect(result.status).toEqual(200);
    });
});
