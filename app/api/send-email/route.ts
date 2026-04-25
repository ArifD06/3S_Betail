import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation des données
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont obligatoires' },
        { status: 400 }
      )
    }

    // Préparation du contenu de l'email
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5dc;">
          <div style="background-color: #C8973A; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact - SSS Bétail</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #C8973A; margin-bottom: 20px;">Informations du client</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Nom complet:</strong> ${name}
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Email:</strong> <a href="mailto:${email}" style="color: #C8973A;">${email}</a>
            </div>
            
            ${phone ? `<div style="margin-bottom: 20px;">
              <strong style="color: #333;">Téléphone:</strong> <a href="tel:${phone}" style="color: #C8973A;">${phone}</a>
            </div>` : ''}
            
            ${subject ? `<div style="margin-bottom: 20px;">
              <strong style="color: #333;">Sujet:</strong> ${subject}
            </div>` : ''}
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333;">Message:</strong>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Ce message a été envoyé depuis le formulaire de contact du site SSS Bétail
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
                Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' })}
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Configuration de l'email
    const emailData = {
      to: 'arifdiakite@gmail.com',
      subject: `SSS Bétail - Nouveau message de ${name}${subject ? ` - ${subject}` : ''}`,
      html: emailContent,
      replyTo: email
    }

    // Pour l'instant, nous allons utiliser une solution simple avec EmailJS ou similaire
    // Mais pour cette démo, nous allons juste logger les données et simuler l'envoi
    console.log('Email à envoyer:', emailData)

    // Simulation d'envoi réussi
    // Dans une vraie implémentation, vous utiliseriez un service comme:
    // - EmailJS
    // - SendGrid
    // - Resend
    // - Nodemailer avec SMTP

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
