resource "aws_dynamodb_table" "booking" {
    name = "${var.environment}-booking"
    hash_key = "id"
    attribute {
        name = "id"
        type = "S"
    }

    write_capacity = "${var.write_capacity}"
    read_capacity = "${var.read_capacity}"
}

resource "aws_ssm_parameter" "dynamodb_booking_table" {
    name = "${var.environment}-dynamodb-booking-table"
    type = "String"
    value = "${var.environment}-booking"
}