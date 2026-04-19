
export class ApiClientHelper {
    private readonly baseUrl: string = 'http://localhost:12315';
    private readonly apiToken: string = '';

    constructor(
        baseUrl: string,
        apiToken: string,

    ) {
        this.baseUrl = baseUrl;
        this.apiToken = apiToken;
    }

    async callLogseqApi(lsMethod: string, method: string, args: string[]) {

        const response = await fetch(`${this.baseUrl}${lsMethod}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method, args }),

        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
}