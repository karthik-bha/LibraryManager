import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";

import { Client as QStashClient } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl!,
    token: config.env.upstash.qstashToken!,
});

const qStashClient = new QStashClient({ token: config.env.upstash.qstashToken! });

export const sendEmail = async ({
    email,
    subject,
    message,
}: {
    email: string;
    subject: string;
    message: string;
}) => {
    try {
        await qStashClient.publishJSON({
            url: "https://api.emailjs.com/api/v1.0/email/send", // EmailJS API endpoint
            body: {
                service_id: config.env.emailJs.emailjsServiceId,
                template_id: config.env.emailJs.emailjsTemplateId,
                user_id: config.env.emailJs.emailjsPvtKey,
                template_params: {
                    from_name: "LibraryManager", // Fixed sender name
                    to_name: email.split("@")[0], // Extract username from email
                    to: email, // Recipient email
                    subject: subject, // Email subject
                    message: message, // Email message
                },
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(`Email request for ${email} sent successfully to QStash.`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
