import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

const getAllEmployees = async (supabase: SupabaseClient) => {
  const { data: employees, error } = await supabase
    .from("employees")
    .select("id,name");

  if (error) {
    console.log("Error");
    console.log(error);
    return null;
  }

  if (!employees || !employees.length) {
    console.log("No data");
    return null;
  }

  return employees;
};

export default async function Home() {
  const supabaseClient = await createClient();

  const employees = await getAllEmployees(supabaseClient);
  console.log(employees);
  return (
    <ul>
      {employees?.map((employee) => (
        <li key={employee.id}>{employee.name}</li>
      ))}
    </ul>
  );
}
