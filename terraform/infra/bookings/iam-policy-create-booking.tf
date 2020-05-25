resource "aws_iam_policy" "iam_policy_create_booking" {
  name = "${var.environment}-iam-policy-create-booking"

  policy = templatefile("${path.module}/templates/dynamodb-policy.tpl", {
    action = "dynamodb:PutItem",
    resource = "${aws_dynamodb_table.booking.arn}"
  })
}