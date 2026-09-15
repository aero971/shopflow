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




╭─ aero in @space in    ~  
╰─➜ curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rushikesh@example.com",
    "password": "password123"
  }'
{"token":"eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5ODMyNSwiZXhwIjoxNzg4NzAxOTI1fQ.uR4EVhEPpZ9yiisTEcf_GaB5-a72sTcUjuumkbWAOHpNbfpM3VCGG5Eth1J7eyZQ","userId":1,"name":"Rushikesh","email":"rushikesh@example.com","role":"USER"}
╭─ aero in @space in    ~  
╰─➜ curl -s http://localhost:8080/api/products
[]




curl -i -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5ODMyNSwiZXhwIjoxNzg4NzAxOTI1fQ.uR4EVhEPpZ9yiisTEcf_GaB5-a72sTcUjuumkbWAOHpNbfpM3VCGG5Eth1J7eyZQ" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
  -------------------------------------------

  eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5ODMyNSwiZXhwIjoxNzg4NzAxOTI1fQ.uR4EVhEPpZ9yiisTEcf_GaB5-a72sTcUjuumkbWAOHpNbfpM3VCGG5Eth1J7eyZQ


  curl -i -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5ODMyNSwiZXhwIjoxNzg4NzAxOTI1fQ.uR4EVhEPpZ9yiisTEcf_GaB5-a72sTcUjuumkbWAOHpNbfpM3VCGG5Eth1J7eyZQ" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'




  eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5OTAxNSwiZXhwIjoxNzg4NzAyNjE1fQ.__j1XXw9vDLzahpxJnDPNNBudn5h0K3IaZFAAF0_-_F0TuO4fbpAEWM8Zgq52i61

  curl -i -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODY5OTAxNSwiZXhwIjoxNzg4NzAyNjE1fQ.__j1XXw9vDLzahpxJnDPNNBudn5h0K3IaZFAAF0_-_F0TuO4fbpAEWM8Zgq52i61" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
{"token":"","userId":1,"name":"Rushikesh","email":"rushikesh@example.com","role":"USER"}
╭─ aero in @space in    shopflow/application/backend  




curl -i -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4ODcwMTQ2MywiZXhwIjoxNzg4NzA1MDYzfQ.c8IEgW_jtpRUw1h4bZnyxkYbc64PQafDXFEgX0noZQzCC1D-nQnn--U5ajnBxVj6" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'


 YOUR_NEW_TOKEN


eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJydXNoaWtlc2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4OTE0MDYwMSwiZXhwIjoxNzg5MTQ0MjAxfQ.Lf22cJ0QlKuAdWKsggZCtc8HxhC2E5LFDzEtYUHpZAdzFVc3XpBHv2IkAH1kueVN