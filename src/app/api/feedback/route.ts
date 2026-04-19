import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { rating, comment } = await request.json();

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            await supabase.from('feedback').insert({
                rating,
                comment: comment?.trim() || null,
            });
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch {
        return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
}
