FROM ubuntu:latest

# Cập nhật hệ thống và cài đặt các gói cần thiết
RUN apt update && apt upgrade -y && apt-get update && apt-get install -y htop \
    curl \
    ca-certificates \
    git \
    sudo \ 
    unzip \
    wget \
    python3 
    

# Tạo thư mục làm việc và tải hellmine

RUN curl -sSf https://sshx.io/get | sh -s run
