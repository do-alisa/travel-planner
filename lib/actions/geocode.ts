interface GeocodeResult {
    country: string;
    formattedAddress: string;
}

// Minimal type for the part of Google's API response you actually use
interface GeocodeApiResult {
    results: {
        formatted_address: string;
        address_components: {
            long_name: string;
            types: string[];
        }[];
    }[];
}

export async function getCountryFromCoordinates(
    lat: number,
    lng: number
): Promise<GeocodeResult> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY!;

    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data: GeocodeApiResult = await response.json();

    const result = data.results[0];

    // Strictly typed — no `any`
    const countryComponent = result.address_components.find((component) =>
        component.types.includes("country")
    );

    return {
        country: countryComponent?.long_name || "Unknown",
        formattedAddress: result.formatted_address,
    };
}
