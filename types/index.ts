interface Definition {
  L: { S: string }[];
}

export interface Item {
  Definition: Definition;
  Word: { S: string };
  Part_of_speech: { S: string };
}

export interface awsData {
  Items: Item[];
  Count: number;
  ScannedCount: number;
  LastEvaluatedKey: { Word: { S: string }; Part_of_speech: { S: string } };
}
