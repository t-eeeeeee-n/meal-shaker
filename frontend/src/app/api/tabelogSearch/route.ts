import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const area = searchParams.get('area') || '横浜';
    const keyword = searchParams.get('keyword') || 'たこ焼き';

    try {
        const response = await axios.get(`https://tabelog.com/rst/rstsearch/?LstKind=1&voluntary_search=1&lid=top_navi1&sa=大阪市&sk=${encodeURIComponent(keyword)}&vac_net=&search_date=2022%2F11%2F29%28火%29&svd=20221129&svt=1900&svps=2&hfc=1&form_submit=&area_datatype=MajorMunicipal&area_id=27100&key_datatype=Genre3&key_id=40&sa_input=${encodeURIComponent(area)}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}