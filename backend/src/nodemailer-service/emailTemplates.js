export const welcomeEmailTemplate = (name) => {
    return {
        subject: 'Welcome to SwahiliPot Hub Booking System',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to SwahiliPot Hub, ${name}!</h2>
                <p>Thank you for registering comfortably.</p>
                <p>You can now log in to your account and start booking rooms.</p>
                <br>
                <p>Best regards,</p>
                <p>The SwahiliPot Hub Team</p>
            </div>
        `
    };
};
