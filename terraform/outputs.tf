output "bucket_name" {
  description = "Name of the private S3 bucket."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.id
}
