

export class FormatUtils {

    static formatToolResponse(content: unknown) {
        let text: string;
        if (typeof content === 'object') {
            text = JSON.stringify(content, null, 2);
        } else {
            text = String(content);
        }
        return {
            content: [
                {
                    type: "text" as const,
                    text
                }
            ]
        }
    }

    static formatToolError(error: Error) {
        return {
            content: [
                {
                    type: "text" as const,
                    text: error.message
                }
            ]
        }
    }
}