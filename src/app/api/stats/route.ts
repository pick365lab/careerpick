import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            // Fallback if Supabase is not configured
            return new Response(JSON.stringify({ count: 1611 }), { status: 200 });
        }

        const { count, error } = await supabase
            .from('usage_logs')
            .select('*', { count: 'exact', head: true });

        if (error) {
            throw error;
        }

        // "수는 실제 접속자 수의 세 배로 넣어주고"
        // Base count + (Real count * 3)
        // Adding a base number to make it look good initially if count is low
        const baseCount = 1611;
        const displayCount = baseCount + ((count || 0) * 3);

        return new Response(JSON.stringify({ count: displayCount }), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch stats:', error);
        return new Response(JSON.stringify({ count: 1611 }), { status: 200 });
    }
}
