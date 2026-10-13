export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      chatbot_omar11: {
        Row: {
          chat_id: string | null;
          chatbox: string | null;
          created_at: string;
          id: number;
        };
        Insert: {
          chat_id?: string | null;
          chatbox?: string | null;
          created_at?: string;
          id?: number;
        };
        Update: {
          chat_id?: string | null;
          chatbox?: string | null;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      chatin: {
        Row: {
          chat: string | null;
          created_at: string;
          id: number;
          updated_at: string | null;
          user_uuid: string | null;
        };
        Insert: {
          chat?: string | null;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
          user_uuid?: string | null;
        };
        Update: {
          chat?: string | null;
          created_at?: string;
          id?: number;
          updated_at?: string | null;
          user_uuid?: string | null;
        };
        Relationships: [];
      };
      gbook_omar11: {
        Row: {
          avatar: string | null;
          cid: string | null;
          comment: string | null;
          id: number;
          inserted_at: string | null;
          name: string | null;
          user_id: string;
        };
        Insert: {
          avatar?: string | null;
          cid?: string | null;
          comment?: string | null;
          id?: number;
          inserted_at?: string | null;
          name?: string | null;
          user_id: string;
        };
        Update: {
          avatar?: string | null;
          cid?: string | null;
          comment?: string | null;
          id?: number;
          inserted_at?: string | null;
          name?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gbook_omar11_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      guestbook_demo: {
        Row: {
          avatar: string | null;
          cid: string | null;
          comment: string | null;
          created_at: string | null;
          id: number;
          name: string | null;
          profile: string | null;
          uid: string | null;
        };
        Insert: {
          avatar?: string | null;
          cid?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          profile?: string | null;
          uid?: string | null;
        };
        Update: {
          avatar?: string | null;
          cid?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string | null;
          profile?: string | null;
          uid?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          last_sign_in_at: string | null;
          provider_avatar: string | null;
          sign_in_provider: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
          last_sign_in_at?: string | null;
          provider_avatar?: string | null;
          sign_in_provider?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          last_sign_in_at?: string | null;
          provider_avatar?: string | null;
          sign_in_provider?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type PublicSchema = DatabaseWithoutInternals[Extract<
  keyof DatabaseWithoutInternals,
  "public"
>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends PublicEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
