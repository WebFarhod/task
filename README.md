# task

# Backend

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Source code

```ts
    #delay 5s
    currentTimeout = setTimeout(() => {
      const { email, number } = req.body;
      const results = data.filter(
        (user) =>
          user.email.includes(email) &&
          (!number || user.number.includes(number))
      );
      res.json(results);
    }, 5000);
```

# Frontend

### Installation

```bash
$ npm install
```

### Running the app

```bash
$ npm run dev
```

```ts
#CancelTokenSource : davom etayotgan Axios sorovlarini bekor qilish uchun.
#CancelTokenSource: For cancelling ongoing Axios requests.
import axios, { CancelTokenSource } from "axios";
```

```ts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    #qiymat tekshirmoqda
    #value is checking
      if (cancelTokenRef.current) {
        #agar mavjud so`rov bo`lsa bekor qiladicancels if there is an existing requestcancels if there is an existing request
        #cancels if there is an existing request
        cancelTokenRef.current.cancel("Operation canceled due to new request.");
      }
      cancelTokenRef.current = axios.CancelToken.source();
      const response = await axios.post(
        "http://localhost:3000/search",
        {
          email,
          number: number.replace(/-/g, "").replace(/_/g, ""),
        },
        {
          cancelToken: cancelTokenRef.current.token,
        }
      );
      setResults(response.data);
    } catch (error) {
        #Bekor qilingan sorovlarni boshqa xatolardan alohida korib chiqish uchun catch blokida bekor qilish tekshirildi
        #Checked for cancellation in the catch block to handle canceled requests separately from other errors.
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  };
```
