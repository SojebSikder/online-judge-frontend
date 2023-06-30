import { ProblemService } from "@/service/problem/problem.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getProblemData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const problemService = await ProblemService.findAll({
      me: 1,
      token: token!["value"],
    });

    const responseProblem = problemService.data.data;

    return responseProblem;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      // console.log(error.response.data.message);
    }
    return null;
  }
}
export default async function Home() {
  const problemData = await getProblemData();

  return (
    <main className="container flex flex-col justify-center items-center">
      <div>
        <h1 className="font-bold m-2">Problems</h1>
      </div>

      <div className="w-1/2">
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Difficulty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {problemData?.map((problem: any) => (
              <tr key={problem.id}>
                <td>
                  <Link className="link" href={`/problems/${problem.id}`}>
                    {problem.name}
                  </Link>
                </td>
                <td>{problem.difficulty}</td>
                <td>
                  <Link
                    href={`/administration/problems/edit/${problem.id}`}
                    className="btn primary"
                  >
                    Edit
                  </Link>
                  <button className="ml-2 btn danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
