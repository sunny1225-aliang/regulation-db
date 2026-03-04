#!/bin/bash

echo "=========================================="
echo "  精细化工安全环保法规库 - 网页版"
echo "=========================================="
echo ""

# 检测操作系统
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "正在启动 Safari..."
    open -a Safari "index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "正在启动浏览器..."
    xdg-open "index.html" 2>/dev/null || \
    sensible-browser "index.html" 2>/dev/null || \
    x-www-browser "index.html" 2>/dev/null || \
    firefox "index.html" 2>/dev/null || \
    google-chrome "index.html" 2>/dev/null || \
    echo "请手动打开 index.html"
else
    echo "无法自动检测系统，请手动打开 index.html"
fi

echo ""
echo "应用已启动！"
echo ""
read -p "按回车键关闭此窗口..."
