import subprocess

def handler(event, context):
    try:
        result = subprocess.run(["lscpu"], capture_output=True, text=True)
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "text/plain"},
            "body": result.stdout
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": f"Lỗi: {str(e)}"
        }
    
