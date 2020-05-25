resource "aws_iam_policy" "iam_policy_login" {
  name = "${var.environment}-iam-policy-login"

  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    action = "dynamodb:Query",
    resource = "${aws_dynamodb_table.users.arn}/index/${var.environment}-email-gsi"
  })
}