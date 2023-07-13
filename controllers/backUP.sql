/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: accounts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `accounts` (
  `accountID` varchar(255) NOT NULL,
  `userType` varchar(45) DEFAULT NULL,
  `username` varchar(55) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`accountID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointmentrequestlist
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointmentrequestlist` (
  `requestID` varchar(55) NOT NULL,
  `dateOfRequest` varchar(25) DEFAULT NULL,
  `studLrn` varchar(55) NOT NULL,
  `timeRequested` varchar(55) NOT NULL,
  `dateRequested` varchar(55) NOT NULL,
  `reason` varchar(1000) NOT NULL,
  `status` varchar(55) NOT NULL,
  `reschedTime` varchar(25) DEFAULT NULL,
  `reschedDate` varchar(25) DEFAULT NULL,
  `response` varchar(525) DEFAULT NULL,
  `eventID` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: calendarevents
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `calendarevents` (
  `eventID` varchar(55) NOT NULL,
  `eventName` varchar(25) NOT NULL,
  `setDate` varchar(15) NOT NULL,
  `setTime` varchar(55) NOT NULL,
  `description` varchar(555) NOT NULL,
  `place` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(15) NOT NULL,
  PRIMARY KEY (`eventID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: guidancecdetails
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `guidancecdetails` (
  `accountID` varchar(55) NOT NULL,
  `lastname` varchar(55) NOT NULL,
  `firstname` varchar(55) NOT NULL,
  `middlename` varchar(55) NOT NULL,
  `contactNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`accountID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notificationgc
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notificationgc` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `message` varchar(245) NOT NULL,
  `timeStamp` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: piscontent
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `piscontent` (
  `pisID` varchar(55) NOT NULL,
  `personalBackground` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`personalBackground`)),
  `familyBackground` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`familyBackground`)),
  `siblings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`siblings`)),
  `maritalStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`maritalStatus`)),
  `educationalInformation` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`educationalInformation`)),
  `educbg2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`educbg2`)),
  `uniqueHealthCosult` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `homeSketch` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`homeSketch`)),
  `dateComplete` varchar(25) DEFAULT NULL,
  `statusComp` varchar(25) NOT NULL,
  PRIMARY KEY (`pisID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: refferralrequest
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `refferralrequest` (
  `referralID` varchar(55) NOT NULL,
  `dateOfReferral` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `employeeID` varchar(55) NOT NULL,
  `teacherName` varchar(555) NOT NULL,
  `teacherContactNum` varchar(55) NOT NULL,
  `designation` varchar(55) NOT NULL,
  `nameOfStudent` varchar(55) NOT NULL,
  `studLrn` varchar(45) NOT NULL,
  `gradeLevel` varchar(55) NOT NULL,
  `gender` varchar(55) NOT NULL,
  `parentName` varchar(55) NOT NULL,
  `parentContactNum` varchar(55) NOT NULL,
  `agreeToCounsel` varchar(55) NOT NULL,
  `reasonforReferral` varchar(525) NOT NULL,
  `initialActions` varchar(525) NOT NULL,
  `acknowledgementContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`acknowledgementContent`)),
  `timeSTAMP` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eventID` varchar(25) NOT NULL,
  PRIMARY KEY (`referralID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: studpis
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `studpis` (
  `LRN` varchar(25) NOT NULL,
  `accountID` varchar(255) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `middlename` varchar(45) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `gradeLevel` varchar(255) DEFAULT NULL,
  `pisID` varchar(55) NOT NULL,
  `counsellingRec` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`LRN`),
  KEY `pisCont` (`pisID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: timestamp
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `timestamp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 151512 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: trya
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `trya` (
  `id` int(45) NOT NULL AUTO_INCREMENT,
  `dateee` varchar(45) NOT NULL,
  `timechosen` varchar(45) NOT NULL,
  `ddaateee` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4412 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: accounts
# ------------------------------------------------------------

INSERT INTO
  `accounts` (`accountID`, `userType`, `username`, `password`)
VALUES
  (
    '7f0fd417a95e902a61a421dbb7cd7519',
    'student',
    '01234567890',
    '$2b$10$4ixV9JSncbmUN2C1wvmChOK7C.qhnMnOSs4qbRLbk9rdMb.688H5u'
  );
INSERT INTO
  `accounts` (`accountID`, `userType`, `username`, `password`)
VALUES
  (
    'a7a45ac2afe3b2633775998d038d4396',
    'gc',
    'gc',
    '$2b$10$6DiPtPodiF.qfgXxHAjJw.diG65JCQ2nmMxvbxEaDC7hZ./WyyxyO'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointmentrequestlist
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: calendarevents
# ------------------------------------------------------------

INSERT INTO
  `calendarevents` (
    `eventID`,
    `eventName`,
    `setDate`,
    `setTime`,
    `description`,
    `place`,
    `status`
  )
VALUES
  (
    '83b12bf956e7fcce',
    'Meeting',
    '2023-07-13',
    '[\"9am-10am\"]',
    'xccx',
    'scx',
    'ongoing'
  );
INSERT INTO
  `calendarevents` (
    `eventID`,
    `eventName`,
    `setDate`,
    `setTime`,
    `description`,
    `place`,
    `status`
  )
VALUES
  (
    '9120d4f11843ae06',
    'Meeting',
    '2023-07-04',
    '[\"10am-11am\"]',
    'sssssssssssss',
    'sssssssss',
    'ongoing'
  );
INSERT INTO
  `calendarevents` (
    `eventID`,
    `eventName`,
    `setDate`,
    `setTime`,
    `description`,
    `place`,
    `status`
  )
VALUES
  (
    '9144030999ce8583',
    'Meeting',
    '2023-07-07',
    '[\"4pm-5pm\"]',
    'ssssssssssssssss',
    'ssssssssf',
    'ongoing'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: guidancecdetails
# ------------------------------------------------------------

INSERT INTO
  `guidancecdetails` (
    `accountID`,
    `lastname`,
    `firstname`,
    `middlename`,
    `contactNumber`
  )
VALUES
  (
    'a7a45ac2afe3b2633775998d038d4396',
    'lastname',
    'firstname',
    'middlename',
    '+639461991211'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notificationgc
# ------------------------------------------------------------

INSERT INTO
  `notificationgc` (`id`, `type`, `message`, `timeStamp`, `status`)
VALUES
  (
    1,
    'Counseling',
    'There are 4 appointment and 2 referral request pending',
    '2023-07-08 06:28:36',
    'read'
  );
INSERT INTO
  `notificationgc` (`id`, `type`, `message`, `timeStamp`, `status`)
VALUES
  (
    2,
    'Counseling',
    '[Student_name] cancelled his/her appointment',
    '2023-07-08 07:28:36',
    'unread'
  );
INSERT INTO
  `notificationgc` (`id`, `type`, `message`, `timeStamp`, `status`)
VALUES
  (
    3,
    'PIS',
    'The completed PIS of students is 504 out of 2500',
    '2023-07-08 09:21:31',
    'unread'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: piscontent
# ------------------------------------------------------------

INSERT INTO
  `piscontent` (
    `pisID`,
    `personalBackground`,
    `familyBackground`,
    `siblings`,
    `maritalStatus`,
    `educationalInformation`,
    `educbg2`,
    `uniqueHealthCosult`,
    `homeSketch`,
    `dateComplete`,
    `statusComp`
  )
VALUES
  (
    '584784',
    '{\"lrn\":\"01234567890\",\"lastname\":\"babasa\",\"firstname\":\"christian\",\"middlename\":\"bigtas\",\"age\":\"18\",\"dateOfBirth\":\"2023-05-04\",\"placeOfBirth\":\"awdawdaw\",\"gender\":\"male\",\"birthAmongSib\":\"eldest\",\"citizenship\":\"awdawdawd\",\"religion\":\"dawda\",\"civilStatus\":\"single\",\"currentAddress\":\"sfsdfsdfs\",\"permanentAddress\":\"fsdfsdfsd\",\"landline\":\"23222-222-2222\",\"cellphoneNo\":\"+639461991211\",\"eMail\":\"cbabasañ2@gmail.com\",\"languageSpoken\":\"fsdffsfsf\"}',
    '{\"father\":{\"status\":\"living\",\"name\":\"awdawdawd\",\"age\":\"51\",\"religion\":\"adawda\",\"nationality\":\"dawdawd\",\"educationalAttainment\":\"awdawd\",\"occupation\":\"awdawda\",\"positionEmployer\":\"dawda\",\"officeBusinessAddress\":\"wdawd\",\"contactNumber\":\"+639123456789\"},\"mother\":{\"status\":\"living\",\"name\":\"awdawd\",\"age\":\"53\",\"religion\":\"dwd\",\"nationality\":\"awd\",\"educationalAttainment\":\"awdaw\",\"occupation\":\"adawd\",\"positionEmployer\":\"awdawdaw\",\"officeBusinessAddress\":\"awdad\",\"contactNumber\":\"+639123456789\"},\"guardian\":{\"relationshipW\":\"\",\"name\":\"\",\"age\":\"\",\"religion\":\"\",\"nationality\":\"\",\"educationalAttainment\":\"\",\"occupation\":\"\",\"positionEmployer\":\"\",\"officeBusinessAddress\":\"\",\"contactNumber\":\"\",\"monthStayed\":\"\"}}',
    '[{\"name\":\"51565\",\"age\":20,\"occupation\":\"65\",\"school_placeWorkL\":\"654\"}]',
    '{\"married\":\"\",\"livingTogether\":\"\",\"singleParent\":false,\"widow\":\"\",\"temporarySeperated\":\"\",\"permanentlySeperated\":\"\",\"marriedAnnulled\":\"\",\"fatherOfw\":\"\",\"motherOfw\":\"\",\"fatherWpartner\":\"\",\"motherWpartner\":\"\"}',
    '[{\"gradeLevel\":\"6\",\"schoolAttended\":\"adawd\",\"inclusiveYearsAttended\":\"awdawd\"}]',
    '{\"subjectWithLowestGrade\":\"a\",\"subjectWithHighestGrade\":\"a\",\"awards\":\"a\",\"newscholarship\":{\"fourpis\":false,\"cibi\":false,\"sistersCharity\":false,\"others\":\"\"}}',
    '{\"friendsInschool\":\"aaaaaaa\",\"outsideInschool\":\"aaaaaaaa\",\"specialInterest\":\"aaaaaaa\",\"hobbies\":\"aaaaaa\",\"characteristicsThatDescibeU\":\"aaaaaaa\",\"presentFears\":\"aaaaaa\",\"disabilities\":\"aaaaaaa\",\"chronicIllness\":\"aaaaaaaa\",\"medicinesRegTaken\":\"aaaaaaaa\",\"accidentsExperienced\":\"aaaaaaaaaa\",\"operationsExp\":\"aaaaaaaa\",\"immunizations\":\"aaaaaaaa\",\"consultedPsy\":\"a\",\"howmanysessionPsy\":\"a\",\"forwhatPsy\":\"a\",\"consultedCoun\":\"a\",\"howmanysessionCoun\":\"aaa\",\"forwhatCoun\":\"aaa\",\"emerContact\":\"jjjjaaa\",\"address\":\"aaa\",\"contactNumber\":\"+639123456789\"}',
    '[\"1481e7ce.jpg\",\"40b7f6c7be66c099.jpg\",\"935a7abf288489ca.jpg\",\"19b3ec24deb168d4.jpg\",\"fbe8177451066fd6.jpg\",\"4509bf47422fbefa.jpg\"]',
    '2023-07-03',
    'complete'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: refferralrequest
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: studpis
# ------------------------------------------------------------

INSERT INTO
  `studpis` (
    `LRN`,
    `accountID`,
    `lastname`,
    `firstname`,
    `middlename`,
    `contactNumber`,
    `gradeLevel`,
    `pisID`,
    `counsellingRec`
  )
VALUES
  (
    '01234567890',
    '7f0fd417a95e902a61a421dbb7cd7519',
    'babasa',
    'christian',
    'bigtass',
    '+639461991211',
    '7',
    '584784',
    '[]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: timestamp
# ------------------------------------------------------------

INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (1, '2023-05-15 19:01:04');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (2, '2023-05-14 19:02:20');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (3, '2023-05-14 19:02:26');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (4, '2023-05-14 19:02:32');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (5, '2023-05-14 19:02:37');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (6, '2023-05-16 00:05:43');
INSERT INTO
  `timestamp` (`id`, `time`)
VALUES
  (151511, '2023-05-16 00:35:05');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: trya
# ------------------------------------------------------------

INSERT INTO
  `trya` (`id`, `dateee`, `timechosen`, `ddaateee`)
VALUES
  (
    10,
    '[value-2]',
    'updated22',
    '[value-4]22222222222222'
  );
INSERT INTO
  `trya` (`id`, `dateee`, `timechosen`, `ddaateee`)
VALUES
  (11, '[value-2]', '[value-3]', '[value-41111111]');
INSERT INTO
  `trya` (`id`, `dateee`, `timechosen`, `ddaateee`)
VALUES
  (12, '[value-2]', '[value-3]', '[value-41111111]');
INSERT INTO
  `trya` (`id`, `dateee`, `timechosen`, `ddaateee`)
VALUES
  (
    102,
    '[value-2]',
    '[value-3]',
    '[value-4]22222222222222'
  );
INSERT INTO
  `trya` (`id`, `dateee`, `timechosen`, `ddaateee`)
VALUES
  (152, '[value-2]', '[value-3]', '[value-4]');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
