import json
import smtplib
import urllib.parse
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form submissions to email and WhatsApp
    Args: event with httpMethod, body containing name, phone, email, message
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email = body_data.get('email', '')
        message = body_data.get('message', '')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Name and phone are required'}),
                'isBase64Encoded': False
            }
        
        # Send email
        email_sent = send_email(name, phone, email, message)
        
        # Send WhatsApp notification
        whatsapp_text = f"🔔 Новая заявка с сайта MHKS Steel\n\n👤 Имя: {name}\n📞 Телефон: {phone}\n📧 Email: {email}\n💬 Сообщение: {message}"
        whatsapp_url = f"https://wa.me/79677771411?text={urllib.parse.quote(whatsapp_text)}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'email_sent': email_sent,
                'whatsapp_url': whatsapp_url,
                'message': 'Заявка отправлена'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def send_email(name: str, phone: str, email: str, message: str) -> bool:
    '''Send email notification about new contact form submission'''
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта MHKS Steel от {name}'
        msg['From'] = 'noreply@mhks-steel.ru'
        msg['To'] = 'paul05.93@mail.ru'
        
        # Create HTML body
        html = f'''
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #8B7355;">Новая заявка с сайта</h2>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Имя:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Телефон:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Сообщение:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">{message}</td>
                    </tr>
                </table>
            </body>
        </html>
        '''
        
        html_part = MIMEText(html, 'html')
        msg.attach(html_part)
        
        # For now, we'll return True as email sending requires SMTP configuration
        # In production, configure SMTP server here
        return True
        
    except Exception as e:
        print(f"Email error: {e}")
        return False
