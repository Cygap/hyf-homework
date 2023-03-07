// interface TodoType {
//     id: number;
//     description: string;
//     deadline: string;
//   }

const initialTodos = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
  );
  console.log("%cgetTodos.tsx line:11 response", "color: #007acc;", response);
  return await response.json();
};
console.log(
  "%cgetTodos.tsx line:13 initialTodos",
  "color: #007acc;",
  initialTodos
);
export default initialTodos;
