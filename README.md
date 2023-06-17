<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Quickstart
Node version: v18.14.0
```shell
yarn install
yarn start:dev
```
or 
```shell
docker-compose up -d
```

## API

#### Sign up
```
POST http://127.0.0.1:3000/auth/signup
{
    "displayName": <display name of user>,
    "email": <user email>,
    "password": <user password>
}
```

#### Sign in
```
POST http://127.0.0.1:3000/auth/signin
{
    "email": <user email>,
    "password": <user password>
}
```

#### Create new video sharing
```
POST http://127.0.0.1:3000/videos/share/create
Header: { Authorization: <jwt token> }
Body: 
{
    "video_id": <youtube video id>,
}
```

#### List all shared videos
```
GET http://127.0.0.1:3000/videos/share/list?page=0&page_size=10
```

#### Get all user shared videos
```
GET http://127.0.0.1:3000/videos/share/list/byUser?page=0&page_size=10
Header: { Authorization: <jwt token> }
```


## License

Nest is [MIT licensed](LICENSE).
