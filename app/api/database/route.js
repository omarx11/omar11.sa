import { createClient } from "@supabase/supabase-js";

export async function POST(req, res) {
  const { data } = await req.json();

  // connect to database
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "next_auth" },
    },
  );

  // if the user have uuid..
  if (data.uuid) {
    const user_uuid = data.uuid || "anonymous";

    const bodyInsert = {
      uuid: user_uuid,
      chat: data.botMessages,
    };

    const bodyUpdate = {
      chat: data.botMessages,
    };

    try {
      // check if the user uuid exist
      const { data, error } = await supabase
        .from("chat_bot")
        .select()
        .eq("uuid", user_uuid)
        .single();

      // the user is exist.. update his column
      if (data) {
        await supabase
          .from("chat_bot")
          .update(bodyUpdate)
          .eq("uuid", user_uuid);
      } else {
        // the user not exist.. insert new column
        await supabase.from("chat_bot").insert(bodyInsert);
      }

      return new Response("data filled successfully");
    } catch (error) {
      console.log("error", error);
      return new Response("error inserting data");
    }
  }
}
