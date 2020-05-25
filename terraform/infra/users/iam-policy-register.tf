resource "aws_iam_policy" "iam_policy_register" {
  name = "${var.environment}-iam-policy-register"

  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    action = "dynamodb:PutItem",
    resource = "${aws_dynamodb_table.users.arn}"
  })
}