async function sendData(data) {
    const apiUrl = 'https://kevenfonseca.app.n8n.cloud/webhook-test/lead'

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error("Failed to send data")
    }

    return response.json()
}

export default sendData