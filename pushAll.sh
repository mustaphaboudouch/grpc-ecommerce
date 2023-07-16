(cd user-api && docker build -t mustaphaboudouch/ecommerce-user-api . && docker push mustaphaboudouch/ecommerce-user-api)
(cd auth-api && docker build -t mustaphaboudouch/ecommerce-auth-api . && docker push mustaphaboudouch/ecommerce-auth-api)
(cd product-api && docker build -t mustaphaboudouch/ecommerce-product-api . && docker push mustaphaboudouch/ecommerce-product-api)