import { ProblemService } from "@/service/problem/problem.service";
import { cookies } from "next/headers";
import Link from "next/link";

async function getProblemData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const problemService = await ProblemService.findAll({
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
            </tr>
          </thead>
          <tbody>
            {problemData?.map((problem: any) => (
              <tr key={problem.id}>
                <td>
                  <div className="flex justify-between">
                    <div>
                      <Link className="link" href={`/problems/${problem.id}`}>
                        {problem.name}
                      </Link>
                    </div>
                    <div>
                      {problem.problem_tags.map((tag: any, index: number) => (
                        <span key={tag.id} className="text-gray-500">
                          {tag.tag.name}
                          {index === problem.problem_tags.length - 1
                            ? ""
                            : ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td>{problem.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
