import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: Request) {
  const { data } = await req.json();

  const supabase = createClient();

  // if the user have chat_id..
  if (data.chat_id) {
    const user_chat_id = data.chat_id;

    const bodyInsert = {
      chat_id: user_chat_id,
      chatbox: data.botMessages,
    };

    const bodyUpdate = {
      chatbox: data.botMessages,
    };

    try {
      // check if the user chat_id exist..
      const { data, error } = await supabase
        .from("chatbot_omar11")
        .select()
        .eq("chat_id", user_chat_id)
        .single();

      // user chat is exist.. update his column
      if (data) {
        await supabase
          .from("chatbot_omar11")
          .update(bodyUpdate)
          .eq("chat_id", user_chat_id);
      } else {
        // user chat not exist.. insert new column
        await supabase.from("chatbot_omar11").insert(bodyInsert);
      }

      return new Response("data filled successfully");
    } catch (error) {
      return new Response("error inserting data");
    }
  }
}
