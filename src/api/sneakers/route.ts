import { NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('sneakers')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    return NextResponse.json({ error: 'Failed to fetch sneakers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sneaker = await request.json();

    const { data, error } = await supabase
      .from('sneakers')
      .insert(sneaker)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating sneaker:', error);
    return NextResponse.json({ error: 'Failed to create sneaker' }, { status: 500 });
  }
}