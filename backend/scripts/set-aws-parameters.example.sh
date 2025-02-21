
aws ssm put-parameter \
  --name "/huez/prod/GOOGLE_CLIENT_ID" \
  --type "String" \
  --value "" \
  --overwrite

aws ssm put-parameter \
  --name "/huez/prod/GOOGLE_CLIENT_SECRET" \
  --type "SecureString" \
  --value "" \
  --key-id "alias/aws/ssm" \
  --overwrite

aws ssm put-parameter \
  --name "/huez/prod/HOST_URL" \
  --type "String" \
  --value "" \
  --overwrite

aws ssm put-parameter \
  --name "/huez/prod/JWT_SECRET" \
  --type "SecureString" \
  --value "" \
  --key-id "alias/aws/ssm" \
  --overwrite

aws ssm put-parameter \
  --name "/huez/prod/MONGODB_CONNECTION_STRING" \
  --type "SecureString" \
  --value "" \
  --key-id "alias/aws/ssm" \
  --overwrite

aws ssm put-parameter \
  --name "/huez/prod/PORT" \
  --type "String" \
  --value "" \
  --overwrite

echo "All environment parameters set successfully."
