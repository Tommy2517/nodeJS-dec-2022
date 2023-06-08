import express from "express"; //{ Request, Response }
// import * as fs from "fs";
import * as mongoose from "mongoose";
// import * as path from "path";

const app = express();

app.use(express.json()); //что то читает, мб джейсон, обязателен.
app.use(express.urlencoded({ extended: true })); //так же

// const reader = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path.join(__dirname, "json", "users.json"),
//       { encoding: "utf-8" },
//       (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           const users = JSON.parse(data);
//           resolve(users);
//         }
//       }
//     );
//   });
// };
//
// const modifyUsers = async (newUser) => {
//   try {
//     const users = await reader();
//     fs.truncate(path.join(__dirname, "json", "users.json"), (err) => {
//       if (err) throw new Error(err.message);
//     });
//     users.push(newUser);
//     fs.appendFile(
//       path.join(__dirname, "json", "users.json"),
//       JSON.stringify(users),
//       (err) => {
//         if (err) throw new Error(err.message);
//       }
//     );
//     return users;
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// };
// const modifyUsers2 = async (id) => {
//   try {
//     const users = await reader();
//     if (id === "last") {
//       console.log("last");
//       return users[users.length - 1];
//     } else if (id === "first") {
//       console.log("first");
//       return users[0];
//     } else if (!id) {
//       return users;
//     } else {
//       return users[id];
//     }
//   } catch (e) {
//     console.error(e);
//     console.log("юзера с таким айди нет");
//     throw e;
//   }
// };
//
// app.get("/users", (req: Request, res: Response) => {
//   //req - то что получили от клиента; res - то что возвращаем клиенту;
//   modifyUsers2(req.body).then((users) => {
//     users.json;
//     res.status(200).json("users");
//   });
// });
//
// app.get("/users/:id", (req: Request, res: Response) => {
//   //принимаем реквест
//   const { id } = req.params; //деструктурируем получаем значение ключа
//   modifyUsers2(id).then((value) => {
//     res.status(200).json(value[+id]); //возвращаем респонс с объектом чей id совпадает с реквестом
//   });
// });
// app.get("users/:id", (req: Request, res: Response) => {
//   modifyUsers2(req.params).then();
//   res.status(200);
// });
//
// app.post("/users", (req: Request, res: Response) => {
//   modifyUsers(req.body).then();
//   console.log(req.body);
//   res.status(201).json({ message: "user created" });
// });

const PORT = 5001; //идентификатор процесса на компьютере

app.listen(PORT, () => {
  mongoose.connect(
    "mongodb+srv://dec2022:FbRCI4ppndbNiyUO@dec-2022.hq2lek2.mongodb.net/"
  );
  console.log(`Example app listening on port ${PORT}`);
});

// 25 мин рассказывается коротко о том что тут проделанно
