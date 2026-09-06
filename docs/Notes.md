User
────────────────────
id          → Long
name        → String
email       → String
password    → String
address     → String
role        → Role

Role
────────
USER
ADMIN


users
────────────────────────
id
name
email
password
address
role

curl -i -X POST http://localhost:8080/api/products \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5NjM3NiwiZXhwIjoxNzg4Njk5OTc2fQ.LlkMqOGz02VV6UW_kowN6A51rW7izlylxCZclr4RYZPM30-pksEm4MLLFFIfhizO" \
-d '{
"name": "Mechanical Keyboard",
"description": "RGB mechanical gaming keyboard",
"price": 2499.00,
"stock": 10
}'

hikesh@example.com",
"password": "password123"
}'
{"token":"","userId":1,"name":"Rushikesh","email":"rushikesh@example.com","role":"USER"}

eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5NjM3NiwiZXhwIjoxNzg4Njk5OTc2fQ.LlkMqOGz02VV6UW_kowN6A51rW7izlylxCZclr4RYZPM30-pksEm4MLLFFIfhizO


curl -i -X DELETE http://localhost:8080/api/products/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5NjM3NiwiZXhwIjoxNzg4Njk5OTc2fQ.LlkMqOGz02VV6UW_kowN6A51rW7izlylxCZclr4RYZPM30-pksEm4MLLFFIfhizO"