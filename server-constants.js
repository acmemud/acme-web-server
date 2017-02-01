'use strict';

const TelnetConstants = {
  IAC                   : 255,   /* interpret as command: */
  DONT                  : 254,   /* you are not to use option */
  DO                    : 253,   /* please, you use option */
  WONT                  : 252,   /* I won't use option */
  WILL                  : 251,   /* I will use option */
  SB                    : 250,   /* interpret as subnegotiation */
  GA                    : 249,   /* you may reverse the line */
  EL                    : 248,   /* erase the current line */
  EC                    : 247,   /* erase the current character */
  AYT                   : 246,   /* are you there */
  AO                    : 245,   /* abort output--but let prog finish */
  IP                    : 244,   /* interrupt process--permanently */
  BREAK                 : 243,   /* break */
  DM                    : 242,   /* data mark--for connect. cleaning */
  NOP                   : 241,   /* nop */
  SE                    : 240,   /* end sub negotiation */
  EOR                   : 239,   /* end of record (transparent mode) */
  ABORT                 : 238,   /* Abort process */
  SUSP                  : 237,   /* Suspend process */
  xEOF                  : 236,   /* End of file: EOF is already used... */
                
  SYNCH                 : 242,   /* for telfunc calls */
  
  TELOPT_BINARY         :   0,   /* 8-bit data path */
  TELOPT_ECHO           :   1,   /* echo */
  TELOPT_RCP            :   2,   /* prepare to reconnect */
  TELOPT_SGA            :   3,   /* suppress go ahead */
  TELOPT_NAMS           :   4,   /* approximate message size */
  TELOPT_STATUS         :   5,   /* give status */
  TELOPT_TM             :   6,   /* timing mark */
  TELOPT_RCTE           :   7,   /* remote controlled transmission and echo */
  TELOPT_NAOL           :   8,   /* negotiate about output line width */
  TELOPT_NAOP           :   9,   /* negotiate about output page size */
  TELOPT_NAOCRD         :  10,   /* negotiate about CR disposition */
  TELOPT_NAOHTS         :  11,   /* negotiate about horizontal tabstops */
  TELOPT_NAOHTD         :  12,   /* negotiate about horizontal tab disposition */
  TELOPT_NAOFFD         :  13,   /* negotiate about formfeed disposition */
  TELOPT_NAOVTS         :  14,   /* negotiate about vertical tab stops */
  TELOPT_NAOVTD         :  15,   /* negotiate about vertical tab disposition */
  TELOPT_NAOLFD         :  16,   /* negotiate about output LF disposition */
  TELOPT_XASCII         :  17,   /* extended ascic character set */
  TELOPT_LOGOUT         :  18,   /* force logout */
  TELOPT_BM             :  19,   /* byte macro */
  TELOPT_DET            :  20,   /* data entry terminal */
  TELOPT_SUPDUP         :  21,   /* supdup protocol */
  TELOPT_SUPDUPOUTPUT   :  22,   /* supdup output */
  TELOPT_SNDLOC         :  23,   /* send location */
  TELOPT_TTYPE          :  24,   /* terminal type */
  TELOPT_EOR            :  25,   /* end or record */
  TELOPT_TUID           :  26,   /* TACACS user identification */
  TELOPT_OUTMRK         :  27,   /* output marking */
  TELOPT_TTYLOC         :  28,   /* terminal location number */
  TELOPT_3270REGIME     :  29,   /* 3270 regime */
  TELOPT_X3PAD          :  30,   /* X.3 PAD */
  TELOPT_NAWS           :  31,   /* window size */
  TELOPT_TSPEED         :  32,   /* terminal speed */
  TELOPT_LFLOW          :  33,   /* remote flow control */
  TELOPT_LINEMODE       :  34,   /* Linemode option */
  TELOPT_XDISPLOC       :  35,   /* X Display Location */
  TELOPT_ENVIRON        :  36,   /* Environment opt for Port ID */
  TELOPT_AUTHENTICATION :  37,   /* authentication */
  TELOPT_ENCRYPT        :  38,   /* authentication */
  TELOPT_NEWENV         :  39,   /* Environment opt for Port ID */
  TELOPT_STARTTLS       :  46,   /* Transport Layer Security */
 
  /* Inofficial, mudspecific telnet options */
  TELOPT_MSSP           :  70,   /* Mud Server Status Protocol */
  TELOPT_COMPRESS       :  85,   /* Mud Compression Protocol, v.1 */
  TELOPT_COMPRESS2      :  86,   /* Mud Compression Protocol, v.2 */
  TELOPT_MSP            :  90,   /* Mud Sound Protocol */
  TELOPT_MXP            :  91,   /* Mud Extension Protocol */
  TELOPT_ZMP            :  93,   /* Zenith Mud Protocol */
  TELOPT_MUSHCLIENT     : 102,   /* Mushclient/Aardwolf Protocol */
  TELOPT_ATCP           : 200,   /* Achaea Telnet Client Protocol */
  TELOPT_EXOPL          : 255,   /* extended-options-list */
  
  NTELOPTS              : 256,   /* was: (1+TELOPT_NEWENV) */


  /* sub-option qualifiers */
  TELQUAL_IS            :  0,    /* option is... */
  TELQUAL_SEND          :  1,    /* send option */

  /* LINEMODE suboptions */
  LM_MODE               :  1,
  LM_FORWARDMASK        :  2,
  LM_SLC                :  3,

  MODE_EDIT             : 0x01,
  MODE_TRAPSIG          : 0x02,
  MODE_ACK              : 0x04,

  MODE_MASK             : (0x01|0x02|0x04),
};

export default TelnetConstants;
