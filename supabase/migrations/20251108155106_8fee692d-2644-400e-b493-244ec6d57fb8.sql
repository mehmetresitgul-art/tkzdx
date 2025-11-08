-- Add UPDATE and DELETE policies for conversations table
CREATE POLICY "Users can update their conversations"
ON conversations FOR UPDATE
USING (auth.uid() = user1_id OR auth.uid() = user2_id)
WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can delete their conversations"
ON conversations FOR DELETE
USING (auth.uid() = user1_id OR auth.uid() = user2_id);