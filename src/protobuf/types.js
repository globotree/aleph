// @flow
// flow types for protobuf messages.  resisting urge to write automatic flow code generator for these

// dir.proto
export type PeerInfoMsg = {
  id: string,
  addr: Array<Buffer>
}

export type RegisterPeerMsg = {
  info: PeerInfoMsg
}

export type LookupPeerRequestMsg = {
  id: string
}

export type LookupPeerResponseMsg = {
  peer: ?PeerInfoMsg
}

export type ListPeersRequestMsg = {
}

export type ListPeersResponseMsg = {
  peers: Array<PeerInfoMsg>
}

// node.proto

export type PingMsg = { }
export type PongMsg = { }

export type QueryRequestMsg = {
  query: string
}

export type QueryResultMsg = { value: QueryResultValueMsg } |
  { end: QueryResultEndMsg } |
  { error: QueryResultErrorMsg }

export type QueryResultValueMsg = { simple: SimpleValueMsg } | { compound: CompoundValueMsg }

export type SimpleValueMsg = { intValue: number } |
    { stringValue: string } |
    { stmt: StatementMsg } |
    { stmtBody: StatementBodyMsg }

export type CompoundValueMsg = {
  body: Array<KeyValuePairMsg>
}

export type KeyValuePairMsg = {
  key: string,
  value: SimpleValueMsg
}

export type QueryResultErrorMsg = {
  error: string
}

export type QueryResultEndMsg = {

}

// stmt.proto

export type SimpleStatementMsg = {
  object: string,
  refs?: Array<string>,
  tags?: Array<string>,
};

export type CompoundStatementMsg = {
  body: Array<SimpleStatementMsg>
};

export type EnvelopeStatementMsg = {
  body: Array<StatementMsg>
}

export type ArchiveStatementMsg = {

}

export type StatementBodyMsg = { simple: SimpleStatementMsg } |
    { compound: CompoundStatementMsg } |
    { envelope: EnvelopeStatementMsg } |
    { archive: ArchiveStatementMsg }

export type StatementMsg = {
  id?: string,
  publisher?: string,
  namespace?: string,
  body: StatementBodyMsg,
};

export type ProtoCodec<T> = { encode: (obj: T) => Buffer, decode: (buf: Buffer) => T }