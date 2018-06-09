-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2018 at 10:16 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `insightnow`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `account_email` varchar(255) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `account_status` int(11) NOT NULL,
  `account_user_limit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_email`, `account_name`, `account_status`, `account_user_limit`) VALUES
(3, 'vikash@gmail.com', 'vikash', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `awscredentials`
--

CREATE TABLE `awscredentials` (
  `id` bigint(20) NOT NULL,
  `accessKey` varchar(255) DEFAULT NULL,
  `awscredentialsName` varchar(255) DEFAULT NULL,
  `mainaccountStatus` int(11) NOT NULL,
  `secretKey` varchar(255) DEFAULT NULL,
  `trashbucketName` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `awscredentials`
--

INSERT INTO `awscredentials` (`id`, `accessKey`, `awscredentialsName`, `mainaccountStatus`, `secretKey`, `trashbucketName`, `user_id`) VALUES
(1, 'AKIAISEDXKBXS77YYJIQ', 'Syra Account', 1, 'msS5RL0hvnUznFko2ZI9M2MS06Z8H6fSgY+K0Olb', 'trashclouditi', 1),
(4, 'AKIAJ45FKYAI6ZE57YJQ', 'VikashNew', 0, '0rV5L/E0OhBa5D8CbZqVM8opcCbDlH92Iy7+oHb1', 'trashclouditi', 1),
(7, 'AKIAJ6CSCKGR37I5LMJA', 'Cloudhiti AWS Account', 0, 'mKQv8g3DKIqNh7o+SuxVpV4fF8fweWlJgH/MoYHC', 'tashbucket1500997197980.1', 1),
(8, 'AKIAIKEW7WHMOYM2QUTQ', 'Hotel_AWS_Account', 0, 'kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8', 'tashbucket1510667034677.1', 1),
(9, 'AKIAIKEW7WHMOYM2QUTQ', 'AWS firepie', 0, 'kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8', 'tashbucket1511268412120.3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` bigint(20) NOT NULL,
  `JobComment` varchar(255) DEFAULT NULL,
  `JobName` varchar(255) DEFAULT NULL,
  `Jobjson` text,
  `jobType_id` bigint(20) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL,
  `Source_Type` bigint(20) DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL,
  `Target_Type` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `JobComment`, `JobName`, `Jobjson`, `jobType_id`, `source_id`, `Source_Type`, `target_id`, `Target_Type`, `user_id`) VALUES
(96, '--', 'job ML Kmean Customer', '{ "sourceMysql": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitiMain","tablename": "clientMain", "fields": "Income,Experience"}, "destinationMysql": {"classname": "com.mysql.jdbc.Driver","dburl": "jdbc:mysql://107.180.2.11:", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitiMain","createnewtable": "false","tableoverride": "true","tablename": "Clustering","fieldseparator": ",","filename": "1495454815815.csv" },"s3dump":{"accesskey":"","secretKey":"","bucketName":"","key":"","s3region":"" } }', 3, 3, 2, 3, 2, 1),
(97, '--', 'job ML LR Retails Sale', '{ "sourceMysql": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitiMain","tablename": "clientMain", "fields": "Income,Experience"}, "destinationMysql": {"classname": "com.mysql.jdbc.Driver","dburl": "jdbc:mysql://107.180.2.11:", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitiMain","createnewtable": "true","tableoverride": "false","tablename": "cluster2","fieldseparator": ",","filename": "1495455407727.csv" },"s3dump":{"accesskey":"","secretKey":"","bucketName":"","key":"","s3region":"" } }', 3, 3, 2, 3, 2, 1),
(103, '--', 'S3 mysql Retail product EL job', '{"accesskey":"AKIAISEDXKBXS77YYJIQ","secretKey":"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","bucketName":"farmersheart","key":"claimsData1487332899.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitiMain","createnewtable":"true","tableoverride":"false","tablename":"Client_data","fieldseparator":","}', 1, 23, 3, 22, 2, 1),
(110, '---', 'job ftp to mysql', NULL, 1, 1, 1, 22, 2, 1),
(134, '--', 'job ftp to mysql', NULL, 1, 1, 1, 22, 2, 1),
(135, '--', 'job s3 to mysql', NULL, 1, 28, 3, 22, 2, 1),
(136, '--', 'job ML kmean mysql- mysql', NULL, 3, 22, 2, 22, 2, 1),
(137, '--', 'job ML LR mysql- mysql', NULL, 3, 22, 2, 22, 2, 1),
(138, '--', 'job tranform mysql -mysql', NULL, 4, 22, 2, 22, 2, 1),
(139, '--', 'job mobile mysql -mysql', NULL, 5, 22, 2, 22, 2, 1),
(140, '--', 'Job ml Train', NULL, 6, 22, 2, 28, 3, 1),
(141, '--', 'Job streaming twitter', NULL, 1, 24, 4, 28, 3, 1),
(151, '--', 'Job Retails Kmean Client', '{ "source": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitiMain","tablename": "retail_cluster_dataset", "fields": "Quantity,age"}, "destination": {"classname": "com.mysql.jdbc.Driver","dburl": "107.180.2.11", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitiMain","createnewtable": "true","tableoverride": "false","tablename": "Retail_Client_cluster1" } }', 3, 22, 2, 22, 2, 1),
(156, '--', 'saas', NULL, 1, 28, 3, 3, 2, 1),
(158, '--', 'Job Ml Train flood detection', NULL, 6, 22, 2, 28, 3, 1),
(159, 'dd', 'asas', NULL, 7, 28, 3, 22, 2, 1),
(160, '--', 'zx', NULL, 7, 28, 3, 22, 2, 1),
(161, 'dsdsd', 'dssd', NULL, 7, 28, 3, 22, 2, 1),
(162, 'ss', 'qq', NULL, 7, 28, 3, 22, 2, 1),
(163, '--', 'Job s3 to mysql flood', NULL, 1, 28, 3, 22, 2, 1),
(164, '--', 'testing f s3', NULL, 1, 1, 1, 29, 3, 1),
(165, '--', 'job s3 to mysql', NULL, 1, 29, 3, 22, 2, 1),
(166, 'ff', 'job s3 to mysql', NULL, 1, 29, 3, 22, 2, 1),
(167, '--', 'job ftp to mysql', NULL, 1, 1, 1, 22, 2, 1),
(168, '---', 'job kmean', NULL, 3, 22, 2, 22, 2, 1),
(169, '--', 'job kmean', NULL, 3, 22, 2, 22, 2, 1),
(170, '--', 'job kmean', NULL, 3, 22, 2, 22, 2, 1),
(171, 'ee', 'testing transform', NULL, 4, 22, 2, 22, 2, 1),
(172, '--', 'gege', NULL, 1, 29, 3, 22, 2, 1),
(173, '--', 'eww', NULL, 6, 22, 2, 29, 3, 1),
(174, '-', 'job 1', NULL, 1, 1, 1, 29, 3, 1),
(175, '---', 'job', '{"accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"1499938708807.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitiMain","createnewtable":"true","tableoverride":"false","tablename":"testing","fieldseparator":","}', 1, 29, 3, 22, 2, 1),
(176, '--', 'job', '{"ftphostName":"cloudhiti.com","ftpPort":"21","ftpUsername":"cloudhitiadmin@cloudhiti.com","ftppassword":"cloudhitiadmin2017","ftpPath":"/text1.php","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"text1.php"}', 1, 1, 1, 29, 3, 1),
(177, '--', 'ftp to mysql', '{"ftphostName":"cloudhiti.com","ftpPort":"21","ftpUsername":"cloudhitiadmin@cloudhiti.com","ftppassword":"cloudhitiadmin2017","ftpPath":"/text1.php","ftpfileName":"text1.php","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitiMain","createnewtable":"false","tableoverride":"false","tablename":"Cluster","fieldseparator":","}', 1, 1, 1, 22, 2, 1),
(178, '==', 'ftp to s3 with new', '{"api":"Syra/api/ftp/ftptos3upload", "accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"tashbucket1498637342262.1","key":"text1.php","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitiMain","createnewtable":"false","tableoverride":"false","tablename":"Cluster","fieldseparator":","}', 1, 29, 3, 22, 2, 1),
(179, '--', 'job ml', '{ "source": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitiMain","tablename": "clientMain", "fields": "ClientID,Age,Family_Member_Cnt"}, "destination": {"classname": "com.mysql.jdbc.Driver","dburl": "107.180.2.11", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitiMain","createnewtable": "true","tableoverride": "false","tablename": "Newclustering" } }', 3, 22, 2, 22, 2, 1),
(180, '--', 'job ftp to s3 latest', '{"api":"/Syra/api/ftp/ftptos3upload","ftphostName":"cloudhiti.com","ftpPort":"21","ftpUsername":"cloudhitiadmin@cloudhiti.com","ftppassword":"cloudhitiadmin2017","ftpPath":"/text1.php","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"text1.php"}', 1, 1, 1, 29, 3, 1),
(181, '--', 'job ftp to s3 2', '{"api":"/Syra/api/ftp/ftptos3upload","ftphostName":"cloudhiti.com","ftpPort":"21","ftpUsername":"cloudhitiadmin@cloudhiti.com","ftppassword":"cloudhitiadmin2017","ftpPath":"/sample/source.csv","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8","bucketName":"vikash2017","key":"source.csv"}', 1, 1, 1, 29, 3, 1),
(183, '--', 'ftp to mysql new', '{"api":"/Syra/api/sourcetodestination/ftptodatabase","ftphostName":"cloudhiti.com","ftpPort":"21","ftpUsername":"cloudhitiadmin@cloudhiti.com","ftppassword":"cloudhitiadmin2017","ftpPath":"/sample/Sessionlog.csv","ftpfileName":"Sessionlog.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitiMain","createnewtable":"true","tableoverride":"false","tablename":"log","fieldseparator":","}', 1, 1, 1, 22, 2, 1),
(185, '--', 'job_hotel_s3_to_mysql_flight_data', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"Hoteldemo/flight.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"true","tableoverride":"false","tablename":"flight_data","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(186, '--', 'job_hotel_s3_to_mysql_weather_data', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"Hoteldemo/weatherfull.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"true","tableoverride":"false","tablename":"weather_data","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(187, '--', 'Job_hotel_Customers_kmean', '{ "api":"http://54.187.187.103:5000/kmeans/","source": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitidemo","tablename": "customer", "fields": "Phone Number,Family_Member_Cnt"}, "destination": {"classname": "com.mysql.jdbc.Driver","dburl": "107.180.2.11", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitidemo","createnewtable": "true","tableoverride": "false","tablename": "Customer_cluster" } }', 3, 30, 2, 30, 2, 1),
(188, '--', 'Job_hotel_waether_ML', '{ "api":"http://54.187.187.103:5000/lr/" ,"apitype":"ML" , "source": { "dburl": "107.180.2.11", "dbport": "3306", "classname": "com.mysql.jdbc.Driver","dbusername": "cloudhitiadmin","dbpassword": "cloudhitiadmin2017", "dbname": "cloudhitidemo","tablename": "weather_data", "fields": "field_2,field_3,field_4,field_5,field_6"}, "destination": {"classname": "com.mysql.jdbc.Driver","dburl": "107.180.2.11", "dbport": "3306", "dbusername": "cloudhitiadmin", "dbpassword": "cloudhitiadmin2017","dbname": "cloudhitidemo","createnewtable": "true","tableoverride": "false","tablename": "Weather_predict" },"s3train":{"accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"vikash2017","key":"Train_1499957884604.zip"} }', 3, 30, 2, 30, 2, 1),
(191, '--', 'job_hotel_stream_twitter', '{  "api":"/Syra/api/streaming/kafka/twitterstream" ,"consumerKey" :"W6Ld6RZRUlDAzkeZvu8uVs2L0","consumerSecret" : "RLIQnqNv8OaN1m0nNKYRmxYpIeVVQOY5h4u3oiVGu18BygARLF","accessToken" : "3237679314-yclzND9v2ZQgeSYcOIDcwF9Qw57TqwX65CuTu4K","accessTokenSecret" : "s6RdmyN9AHVORAL0uLANlq6ZlX6guYN6ioTaWQ47eGIfe","keyword" : "GCP,Hadoop,Big Data", "topicName": "vikash1,","batchSize" : "100","accesskey" : "AKIAIKEW7WHMOYM2QUTQ","secretKey" : "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","bucketName" : "vikash2017","key" : "vikashtwitter/hoteltwits/" } ', 1, 24, 4, 29, 3, 1),
(192, '--', 'job firepie', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"totalincome.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"true","tableoverride":"false","tablename":"total_income","fieldseparator":","}', 1, 34, 3, 3, 2, 3),
(193, '--', 'job firepie 1', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"total_income.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"true","tableoverride":"false","tablename":"total_income","fieldseparator":","}', 1, 34, 3, 3, 2, 3),
(194, '--', 'Job test', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"Order List.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"false","tableoverride":"true","tablename":"orderdata_firepie","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(195, '--', 'job test2', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"Order List.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"false","tableoverride":"false","tablename":"orderdata_firepie","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(196, '--', 'job_firepie_s3_to_mysql_Delivery', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"Delivery.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"false","tableoverride":"false","tablename":"job_csv","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(197, '--', 'job_firepie_s3_to_mysql_order', '{"api":"/Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"OrderList.csv","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"false","tableoverride":"false","tablename":"order_csv","fieldseparator":","}', 1, 29, 3, 30, 2, 1),
(198, 'oo', 'job_s3_to_mysql_flight_data', '{"api":"Syra/api/sourcetodestination/s3todatabase","accesskey":"AKIAIKEW7WHMOYM2QUTQ","secretKey":"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","bucketName":"firepie","key":"package.json","classname": "com.mysql.jdbc.Driver","dburl":"jdbc:mysql://107.180.2.11:","dbport":"3306","dbusername":"cloudhitiadmin","dbpassword":"cloudhitiadmin2017","dbname":"cloudhitidemo","createnewtable":"true","tableoverride":"false","tablename":"package","fieldseparator":","}', 1, 29, 3, 30, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jobdependent`
--

CREATE TABLE `jobdependent` (
  `id` bigint(20) NOT NULL,
  `DestinationbucketName` varchar(255) DEFAULT NULL,
  `DestinationfolderPath` varchar(255) DEFAULT NULL,
  `DestinationfileKey` varchar(255) DEFAULT NULL,
  `Destinationrdbmsnewtable` bit(1) DEFAULT NULL,
  `DestinationrdbmsnewtableTruncate` bit(1) DEFAULT NULL,
  `DestinationrdbmstableName` varchar(255) DEFAULT NULL,
  `SorcebucketName` varchar(255) DEFAULT NULL,
  `SourcefileKey` varchar(255) DEFAULT NULL,
  `SourcefolderPath` varchar(255) DEFAULT NULL,
  `Sourcerdbmsnewtable` bit(1) DEFAULT NULL,
  `SourcerdbmsnewtableTruncate` bit(1) DEFAULT NULL,
  `SourcerdbmstableName` varchar(255) DEFAULT NULL,
  `sourcerhashtag` varchar(255) DEFAULT NULL,
  `sourcerbatchsize` int(11) DEFAULT NULL,
  `sourcerkafkaName` varchar(255) DEFAULT NULL,
  `dumpaccessKey` varchar(255) DEFAULT NULL,
  `dumpsecretKey` varchar(255) DEFAULT NULL,
  `dumpbucketName` varchar(255) DEFAULT NULL,
  `dumpKey` varchar(255) DEFAULT NULL,
  `dumpbucketlocation` varchar(255) DEFAULT NULL,
  `trainaccessKey` varchar(255) DEFAULT NULL,
  `trainsecretKey` varchar(255) DEFAULT NULL,
  `trainbucketName` varchar(255) DEFAULT NULL,
  `trainKey` varchar(255) DEFAULT NULL,
  `mlalgorithm` varchar(255) DEFAULT NULL,
  `mlVariable` text,
  `transformquery` text,
  `job_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobdependent`
--

INSERT INTO `jobdependent` (`id`, `DestinationbucketName`, `DestinationfolderPath`, `DestinationfileKey`, `Destinationrdbmsnewtable`, `DestinationrdbmsnewtableTruncate`, `DestinationrdbmstableName`, `SorcebucketName`, `SourcefileKey`, `SourcefolderPath`, `Sourcerdbmsnewtable`, `SourcerdbmsnewtableTruncate`, `SourcerdbmstableName`, `sourcerhashtag`, `sourcerbatchsize`, `sourcerkafkaName`, `dumpaccessKey`, `dumpsecretKey`, `dumpbucketName`, `dumpKey`, `dumpbucketlocation`, `trainaccessKey`, `trainsecretKey`, `trainbucketName`, `trainKey`, `mlalgorithm`, `mlVariable`, `transformquery`, `job_id`) VALUES
(91, NULL, NULL, NULL, b'0', b'1', 'kmeancluster', NULL, NULL, NULL, b'0', b'1', 'clientMain', '', 0, '', '', '', '', '', '', '', '', '', '', 'Kmean', 'Income,Experience', NULL, 96),
(92, NULL, NULL, NULL, b'1', b'0', 'Retail_Sale', NULL, NULL, NULL, b'1', b'0', 'clientMain', '', 0, '', '', '', '', '', '', '', '', '', '', 'Kmean', 'Income,Experience', NULL, 97),
(98, NULL, NULL, NULL, b'1', b'0', 'Retail_Product', 'vikash2017', 'claimsData1487332899.csv', NULL, NULL, NULL, NULL, '', 0, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, 103),
(105, NULL, NULL, NULL, b'1', b'0', 'source', NULL, 'source.csv', '/sample/source.csv', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 110),
(129, NULL, NULL, NULL, b'1', b'0', 'source', NULL, 'source.csv', '/sample/source.csv', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 134),
(130, NULL, NULL, NULL, b'1', b'0', 'weather_test', 'vikash2017', 'weather_test.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 135),
(131, NULL, NULL, NULL, b'1', b'0', 'newclient_data', NULL, NULL, NULL, b'1', b'0', 'clientMain', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kmean', 'Age,Income', NULL, 136),
(132, NULL, NULL, NULL, b'1', b'0', 'newweatherpredict', NULL, NULL, NULL, b'1', b'0', 'Weatherpredict', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'AKIAJ6CSCKGR37I5LMJA', 'mKQv8g3DKIqNh7o+SuxVpV4fF8fweWlJgH/MoYHC', 'vikash2017', 'Train_1499957884604.zip', 'LR', 'field_2,field_3,field_4,field_5,field_6', NULL, 137),
(133, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'test', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'insert', 138),
(134, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'Weatherpredict', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'select count(*) from weatherpredict', 139),
(135, 'vikash2017', NULL, 'Train_1499957884604.zip', NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'Weathertrain', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'LRTrain', 'field_2,field_3,field_4,field_5,field_6,field_7', NULL, 140),
(136, 'vikash2017', NULL, 'NULL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'bigdata,spark,hadoop', 100, 'cloudhiti,', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 141),
(146, NULL, NULL, NULL, b'1', b'0', 'Retail_Client_cluster1', NULL, NULL, NULL, b'1', b'0', 'retail_cluster_dataset', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kmean', 'Quantity,age', NULL, 151),
(151, NULL, NULL, NULL, b'1', b'0', 'test', 'vikash2017', '14986374920261448672585790-P-3524659.jpg', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 156),
(153, 'vikash2017', NULL, 'flood/flood.rds', NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'weather_test', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'LRTrain', 'field_1,field_3', NULL, 158),
(154, NULL, NULL, NULL, b'0', b'0', 'Cluster', 'vikash2017', 'flood/floodmodel.rds', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 159),
(155, NULL, NULL, NULL, b'0', b'0', 'Retail_Client_cluster1', 'vikash2017', 'flood/floodmodel.rds', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 160),
(156, NULL, NULL, NULL, b'0', b'0', 'Retail_Client_cluster1', 'vikash2017', 'flood/floodmodel.rds', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 161),
(157, NULL, NULL, NULL, b'0', b'0', 'Retail_Client_cluster1', 'vikash2017', 'flood/floodmodel.rds', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 162),
(158, NULL, NULL, NULL, b'1', b'0', 'FloodTable', 'vikash2017', 'flood/flood.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 163),
(159, 'vikash2017', NULL, 'flood/test21.php', NULL, NULL, NULL, NULL, 'test21.php', '/Sample2/test21.php', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 164),
(160, NULL, NULL, NULL, b'1', b'0', 'testing', 'vikash2017', '1499938639145.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 165),
(161, NULL, NULL, NULL, b'1', b'0', 'testing', 'vikash2017', 'vikashtwitter/text1.php', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 166),
(162, NULL, NULL, NULL, b'1', b'0', 'testing', NULL, 'sampel21.txt', '/Sample2/sample21/sampel21.txt', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 167),
(163, NULL, NULL, NULL, b'1', b'0', 'testing', NULL, NULL, NULL, b'1', b'0', 'Cluster', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kmean', 'Age,Income,Experience', NULL, 168),
(164, NULL, NULL, NULL, b'1', b'0', 'testing', NULL, NULL, NULL, b'1', b'0', 'Cluster', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'AKIAJ45FKYAI6ZE57YJQ', '0rV5L/E0OhBa5D8CbZqVM8opcCbDlH92Iy7+oHb1', 'vikash210', 'DataModel.vsdx', 'LR', 'Age,Age,Income,Experience', NULL, 169),
(165, NULL, NULL, NULL, b'1', b'0', 'testing', NULL, NULL, NULL, b'1', b'0', 'Cluster', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'AKIAJ45FKYAI6ZE57YJQ', '0rV5L/E0OhBa5D8CbZqVM8opcCbDlH92Iy7+oHb1', 'vikash210', 'test/2.mp4', 'LR', 'Age,', NULL, 170),
(166, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'Cluster', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sefewc', 171),
(167, NULL, NULL, NULL, b'0', b'0', 'Cluster', 'abhinandan2017', 'AWSLogs/234628519848/CloudTrail-Digest/ap-northeast-1/2017/09/11/234628519848_CloudTrail-Digest_ap-northeast-1_CloudhitiCloudTrail_us-west-2_20170911T111838Z.json.gz', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 172),
(168, 'vikash2017', NULL, 'flood/null', NULL, NULL, NULL, NULL, NULL, NULL, b'0', b'0', 'Cluster', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'LRTrain', 'Age,Age,Income,Experience', NULL, 173),
(169, 'abhinandan2017', NULL, 'twitter/text1.php', NULL, NULL, NULL, NULL, 'text1.php', '/text1.php', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 174),
(170, NULL, NULL, NULL, b'1', b'0', 'testing', 'vikash2017', '1499938708807.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 175),
(171, 'vikash2017', NULL, 'text1.php', NULL, NULL, NULL, NULL, 'text1.php', '/text1.php', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 176),
(172, NULL, NULL, NULL, b'0', b'1', 'Cluster', NULL, 'text1.php', '/text1.php', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 177),
(173, NULL, NULL, NULL, b'0', b'1', 'Cluster', 'tashbucket1498637342262.1', 'text1.php', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 178),
(174, NULL, NULL, NULL, b'1', b'0', 'Newclustering', NULL, NULL, NULL, b'1', b'0', 'clientMain', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kmean', 'ClientID,Age,Family_Member_Cnt', NULL, 179),
(175, 'vikash2017', NULL, 'text1.php', NULL, NULL, NULL, NULL, 'text1.php', '/text1.php', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 180),
(176, 'vikash2017', NULL, 'source.csv', NULL, NULL, NULL, NULL, 'source.csv', 'sample/source.csv', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 181),
(178, NULL, NULL, NULL, b'1', b'0', 'log', NULL, 'Sessionlog.csv', '/sample/Sessionlog.csv', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 183),
(180, NULL, NULL, NULL, b'1', b'0', 'flight_data', 'vikash2017', 'Hoteldemo/flight.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 185),
(181, NULL, NULL, NULL, b'1', b'0', 'weather_data', 'vikash2017', 'Hoteldemo/weatherfull.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 186),
(182, NULL, NULL, NULL, b'1', b'0', 'Customer_cluster', NULL, NULL, NULL, b'1', b'0', 'customer', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kmean', 'Family_Member_Cnt', NULL, 187),
(183, NULL, NULL, NULL, b'1', b'0', 'Weather_predict', NULL, NULL, NULL, b'1', b'0', 'weather_data', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'LR', 'field_2,field_3,field_4,field_5,field_6,field_7', NULL, 188),
(186, 'vikash2017', NULL, 'vikashtwitter/', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 191),
(187, NULL, NULL, NULL, b'1', b'0', 'total_income', 'firepie', 'total_income.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 192),
(188, NULL, NULL, NULL, b'1', b'0', 'total_income', 'firepie', 'totalincome.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 193),
(189, NULL, NULL, NULL, b'0', b'0', 'orderdata_firepie', 'firepie', 'Order List.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 194),
(190, NULL, NULL, NULL, b'0', b'1', 'orderdata_firepie', 'firepie', 'Order List.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 195),
(191, NULL, NULL, NULL, b'0', b'1', 'job_csv', 'firepie', 'Delivery.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 196),
(192, NULL, NULL, NULL, b'0', b'1', 'job_csv', 'firepie', 'Delivery.csv', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 197),
(193, NULL, NULL, NULL, b'1', b'0', 'package', 'firepie', 'package.json', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 198);

-- --------------------------------------------------------

--
-- Table structure for table `jobmetadata`
--

CREATE TABLE `jobmetadata` (
  `id` bigint(11) NOT NULL,
  `checksumvalue` varchar(255) DEFAULT NULL,
  `enddatetime` varchar(255) DEFAULT NULL,
  `filerowcount` bigint(20) DEFAULT NULL,
  `jobid` bigint(20) DEFAULT NULL,
  `startdatetime` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jobmetadata`
--

INSERT INTO `jobmetadata` (`id`, `checksumvalue`, `enddatetime`, `filerowcount`, `jobid`, `startdatetime`, `status`) VALUES
(1, 'vbcbc', 'bccb', 1, 2, '10.12.12', '');

-- --------------------------------------------------------

--
-- Table structure for table `jobtype`
--

CREATE TABLE `jobtype` (
  `id` bigint(20) NOT NULL,
  `JobTypeName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobtype`
--

INSERT INTO `jobtype` (`id`, `JobTypeName`) VALUES
(1, 'EL'),
(2, 'ETL'),
(3, 'ML'),
(4, 'Transform'),
(5, 'Notification'),
(6, 'ML Train'),
(7, 'Validate');

-- --------------------------------------------------------

--
-- Table structure for table `metadata`
--

CREATE TABLE `metadata` (
  `id` int(11) DEFAULT NULL,
  `checksumvalue` varchar(255) DEFAULT NULL,
  `enddatetime` varchar(255) DEFAULT NULL,
  `filerowcount` bigint(20) DEFAULT NULL,
  `jobid` bigint(20) DEFAULT NULL,
  `startdatetime` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `metadata`
--

INSERT INTO `metadata` (`id`, `checksumvalue`, `enddatetime`, `filerowcount`, `jobid`, `startdatetime`, `status`) VALUES
(NULL, 'vbcbc', 'bccb', 1, 2, '10.12.12', ''),
(NULL, 'd', 's', 4, NULL, 'w', '8');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` bigint(20) NOT NULL,
  `scheduleName` varchar(255) DEFAULT NULL,
  `scheduleDetails` varchar(255) DEFAULT NULL,
  `scheduleTime` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `scheduleName`, `scheduleDetails`, `scheduleTime`, `user_id`) VALUES
(3, 'schedule monthly', 'Monthly', '18:40', 1),
(4, 'vs', 'Daily', '18:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `servercredentials`
--

CREATE TABLE `servercredentials` (
  `id` bigint(20) NOT NULL,
  `ServerName` varchar(255) DEFAULT NULL,
  `accessKey` varchar(255) DEFAULT NULL,
  `appkey` varchar(255) DEFAULT NULL,
  `appsecret` varchar(255) DEFAULT NULL,
  `consumerKey` varchar(255) DEFAULT NULL,
  `consumersecret` varchar(255) DEFAULT NULL,
  `databaseName` varchar(255) DEFAULT NULL,
  `databaseType` varchar(255) DEFAULT NULL,
  `hosturl` varchar(255) DEFAULT NULL,
  `className` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `port` bigint(20) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `secretKey` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `servertype_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servercredentials`
--

INSERT INTO `servercredentials` (`id`, `ServerName`, `accessKey`, `appkey`, `appsecret`, `consumerKey`, `consumersecret`, `databaseName`, `databaseType`, `hosturl`, `className`, `password`, `port`, `reason`, `secretKey`, `username`, `servertype_id`, `user_id`) VALUES
(1, 'Ftp Cloulditi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cloudhiti.com', NULL, 'cloudhitiadmin2017', 21, NULL, NULL, 'cloudhitiadmin@cloudhiti.com', 1, 1),
(3, 'Mysql Connection', NULL, NULL, NULL, NULL, NULL, 'cloudhitidemo', 'Mysql', 'jdbc:mysql://107.180.2.11:', 'com.mysql.jdbc.Driver', 'cloudhitiadmin2017', 3306, NULL, NULL, 'cloudhitiadmin', 2, 3),
(6, 'AWS Source', 'AKIAISEDXKBXS77YYJIQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'msS5RL0hvnUznFko2ZI9M2MS06Z8H6fSgY+K0Olb', NULL, 3, 1),
(12, 'Server Mysql', NULL, NULL, NULL, NULL, NULL, 'cloudhiti', 'Mysql', 'jdbc:mysql://107.180.2.11:', 'com.mysql.jdbc.Driver', 'cloudhitiadmin2017', 3306, NULL, NULL, 'cloudhitiadmin', 2, 1),
(13, 'Vikash AWS', 'AKIAJ6CSCKGR37I5LMJA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'mKQv8g3DKIqNh7o+SuxVpV4fF8fweWlJgH/MoYHC', NULL, 3, 1),
(14, 'Redshift source', NULL, NULL, NULL, NULL, NULL, 'cloudhiti', 'Redshift', 'jdbc:redshift://cloudhiti.ciz5272nihoc.us-west-2.redshift.amazonaws.com:', 'com.amazon.redshift.jdbc4.Driver', 'Cloudhiti1', 5439, NULL, NULL, 'cloudhiti', 2, 1),
(15, 'RedShift Source New', NULL, NULL, NULL, NULL, NULL, 'cloudhiti', 'Redshift', 'jdbc:redshift://cloudhiti.cx0plw3r3dmp.us-west-2.redshift.amazonaws.com:', 'com.amazon.redshift.jdbc4.Driver', 'Cloudhiti123', 5439, NULL, NULL, 'cloudhiti', 2, 1),
(19, 'Redshift source', NULL, NULL, NULL, NULL, NULL, 'cloudhiti', 'Redshift', 'jdbc:redshift://cloudhiti.ciz5272nihoc.us-west-2.redshift.amazonaws.com:', 'com.amazon.redshift.jdbc4.Driver', 'cloudhiti', 5439, NULL, NULL, 'cloudhiti', 2, 1),
(22, 'Weather_Mysql_src', NULL, NULL, NULL, NULL, NULL, 'cloudhitiMain', 'Mysql', 'jdbc:mysql://107.180.2.11:', 'com.mysql.jdbc.Driver', 'cloudhitiadmin2017', 3306, NULL, NULL, 'cloudhitiadmin', 2, 1),
(23, 'Weather_AWS_S3_src', 'AKIAISEDXKBXS77YYJIQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'msS5RL0hvnUznFko2ZI9M2MS06Z8H6fSgY+K0Olb', NULL, 3, 1),
(24, 'Twitter', NULL, '84065249-kiFNccG1vUBdv2lV4Qe195GRyOWdHBC34gpwq7zNQ', 'mLGYuGynhTjhDIPNac4APw3lgYTxGwEahrIwbjZDDabxy', '4BqpCwjjQIfVjZI0YTefqjcze', '6u8vrNrKLmdH45U58wTAVP2IDCkYgMPBvj3MeZVHoHgmHxPydx', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 1),
(28, 'AWS s3 Source', 'AKIAJ6CSCKGR37I5LMJA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'mKQv8g3DKIqNh7o+SuxVpV4fF8fweWlJgH/MoYHC', NULL, 3, 1),
(29, 'testings', 'AKIAIKEW7WHMOYM2QUTQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8', NULL, 3, 1),
(30, 'Mysql_hotel_src', NULL, NULL, NULL, NULL, NULL, 'cloudhitidemo', 'Mysql', 'jdbc:mysql://107.180.2.11:', 'com.mysql.jdbc.Driver', 'cloudhitiadmin2017', 3306, NULL, NULL, 'cloudhitiadmin', 2, 1),
(32, 'ccs 2', 'csc', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sc', NULL, 3, 3),
(33, 'qew', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'q', NULL, 'q', 1, NULL, NULL, 'q', 1, 3),
(34, 'aws firepie', 'AKIAIKEW7WHMOYM2QUTQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kpZX6gXZvMJnMWSVmTiiUPNaGvzZsy8eNlGvbKQ8', NULL, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `servertype`
--

CREATE TABLE `servertype` (
  `id` bigint(20) NOT NULL,
  `ServerTypeName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servertype`
--

INSERT INTO `servertype` (`id`, `ServerTypeName`) VALUES
(1, 'FTP'),
(2, 'RDBMS SQL'),
(3, 'AWS S3'),
(4, 'Twitter'),
(5, 'IoT Device');

-- --------------------------------------------------------

--
-- Table structure for table `twitterkafka`
--

CREATE TABLE `twitterkafka` (
  `id` bigint(20) NOT NULL,
  `twitterKafkaName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `twitterkafka`
--

INSERT INTO `twitterkafka` (`id`, `twitterKafkaName`) VALUES
(1, 'twittertest'),
(2, 'teas'),
(3, 'vikash'),
(4, 'cloudhiti');

-- --------------------------------------------------------

--
-- Table structure for table `userlog`
--

CREATE TABLE `userlog` (
  `id` bigint(20) NOT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `log_time` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `user_data` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userlog`
--

INSERT INTO `userlog` (`id`, `ip_address`, `log_time`, `session_id`, `user_agent`, `user_data`, `user_id`) VALUES
(1, NULL, NULL, 'Admin', NULL, NULL, 1),
(2, NULL, '2017/04/06 18:22:00', 'Admin', NULL, NULL, 1),
(3, NULL, '2017/04/07 10:31:51', 'Admin', NULL, NULL, 1),
(4, NULL, '2017/04/07 17:22:52', 'Admin', NULL, NULL, 1),
(5, NULL, '2017/04/07 17:22:55', 'Admin', NULL, NULL, 1),
(6, NULL, '2017/04/07 17:27:36', 'Admin', NULL, NULL, 1),
(7, NULL, '2017/04/10 10:25:29', 'Admin', NULL, NULL, 1),
(8, NULL, '2017/04/10 10:28:46', 'Admin', NULL, NULL, 1),
(9, NULL, '2017/04/10 10:30:31', 'Admin', NULL, NULL, 1),
(10, NULL, '2017/04/10 10:31:11', 'Admin', NULL, NULL, 1),
(11, NULL, '2017/04/10 14:08:20', 'Admin', NULL, NULL, 1),
(12, NULL, '2017/04/10 22:11:50', 'Admin', NULL, NULL, 1),
(13, NULL, '2017/04/11 09:43:11', 'Admin', NULL, NULL, 1),
(14, NULL, '2017/04/11 11:44:33', 'Admin', NULL, NULL, 1),
(15, NULL, '2017/04/11 17:08:20', 'Admin', NULL, NULL, 1),
(16, NULL, '2017/04/12 10:04:59', 'Admin', NULL, NULL, 1),
(17, NULL, '2017/04/12 11:38:43', 'Admin', NULL, NULL, 1),
(18, NULL, '2017/04/12 14:55:07', 'Admin', NULL, NULL, 1),
(19, NULL, '2017/04/12 22:55:48', 'Admin', NULL, NULL, 1),
(20, NULL, '2017/04/13 10:07:19', 'Admin', NULL, NULL, 1),
(21, NULL, '2017/04/13 23:13:04', 'Admin', NULL, NULL, 1),
(22, NULL, '2017/04/14 21:59:14', 'Admin', NULL, NULL, 1),
(23, NULL, '2017/04/14 21:59:25', 'Admin', NULL, NULL, 1),
(24, NULL, '2017/04/15 00:35:01', 'Admin', NULL, NULL, 1),
(25, NULL, '2017/04/15 11:04:21', 'Admin', NULL, NULL, 1),
(26, NULL, '2017/04/16 00:59:26', 'Admin', NULL, NULL, 1),
(27, NULL, '2017/04/16 00:59:36', 'Admin', NULL, NULL, 1),
(28, NULL, '2017/04/17 10:00:35', 'Admin', NULL, NULL, 1),
(29, NULL, '2017/04/17 10:00:39', 'Admin', NULL, NULL, 1),
(30, NULL, '2017/04/17 11:01:41', 'Admin', NULL, NULL, 1),
(31, NULL, '2017/04/17 11:01:48', 'Admin', NULL, NULL, 1),
(32, NULL, '2017/04/17 11:01:52', 'Admin', NULL, NULL, 1),
(33, NULL, '2017/04/17 16:48:38', 'Admin', NULL, NULL, 1),
(34, NULL, '2017/04/18 00:01:02', 'Admin', NULL, NULL, 1),
(35, NULL, '2017/04/18 11:08:06', 'Admin', NULL, NULL, 1),
(36, NULL, '2017/04/18 20:59:22', 'Admin', NULL, NULL, 1),
(37, NULL, '2017/04/18 21:24:50', 'Admin', NULL, NULL, 1),
(38, NULL, '2017/04/19 11:13:11', 'Admin', NULL, NULL, 1),
(39, NULL, '2017/04/19 14:29:35', 'Admin', NULL, NULL, 1),
(40, NULL, '2017/04/20 10:16:31', 'Admin', NULL, NULL, 1),
(41, NULL, '2017/04/20 11:13:30', 'Admin', NULL, NULL, 1),
(42, NULL, '2017/04/21 11:33:50', 'Admin', NULL, NULL, 1),
(43, NULL, '2017/04/21 11:49:36', 'Admin', NULL, NULL, 1),
(44, NULL, '2017/04/22 14:04:01', 'Admin', NULL, NULL, 1),
(45, NULL, '2017/04/24 11:56:17', 'Admin', NULL, NULL, 1),
(46, NULL, '2017/04/24 23:42:32', 'Admin', NULL, NULL, 1),
(47, NULL, '2017/04/25 10:45:18', 'Admin', NULL, NULL, 1),
(48, NULL, '2017/04/25 14:32:06', 'Admin', NULL, NULL, 1),
(49, NULL, '2017/04/25 17:16:50', 'Admin', NULL, NULL, 1),
(50, NULL, '2017/04/25 17:16:58', 'Admin', NULL, NULL, 1),
(51, NULL, '2017/04/25 22:37:09', 'Admin', NULL, NULL, 1),
(52, NULL, '2017/04/26 11:33:36', 'Admin', NULL, NULL, 1),
(53, NULL, '2017/04/26 16:47:36', 'Admin', NULL, NULL, 1),
(54, NULL, '2017/04/26 18:24:30', 'Admin', NULL, NULL, 1),
(55, NULL, '2017/04/26 19:34:32', 'Admin', NULL, NULL, 1),
(56, NULL, '2017/04/26 20:18:38', 'Admin', NULL, NULL, 1),
(57, NULL, '2017/04/26 20:19:26', 'Admin', NULL, NULL, 1),
(58, NULL, '2017/04/26 21:39:11', 'Admin', NULL, NULL, 1),
(59, NULL, '2017/04/26 21:39:38', 'Admin', NULL, NULL, 1),
(60, NULL, '2017/04/26 23:14:34', 'Admin', NULL, NULL, 1),
(61, NULL, '2017/04/27 01:05:40', 'Admin', NULL, NULL, 1),
(62, NULL, '2017/04/27 02:21:52', 'Admin', NULL, NULL, 1),
(63, NULL, '2017/04/27 09:10:33', 'Admin', NULL, NULL, 1),
(64, NULL, '2017/04/27 10:29:19', 'Admin', NULL, NULL, 1),
(65, NULL, '2017/04/27 11:37:50', 'Admin', NULL, NULL, 1),
(66, NULL, '2017/05/02 13:29:45', 'Admin', NULL, NULL, 1),
(67, NULL, '2017/05/02 13:31:13', 'Admin', NULL, NULL, 1),
(68, NULL, '2017/05/02 13:31:16', 'Admin', NULL, NULL, 1),
(69, NULL, '2017/05/02 13:31:17', 'Admin', NULL, NULL, 1),
(70, NULL, '2017/05/02 13:31:17', 'Admin', NULL, NULL, 1),
(71, NULL, '2017/05/02 13:31:17', 'Admin', NULL, NULL, 1),
(72, NULL, '2017/05/02 13:31:17', 'Admin', NULL, NULL, 1),
(73, NULL, '2017/05/02 13:49:55', 'Admin', NULL, NULL, 1),
(74, NULL, '2017/05/02 13:55:39', 'Admin', NULL, NULL, 1),
(75, NULL, '2017/05/04 16:44:25', 'Admin', NULL, NULL, 1),
(76, NULL, '2017/05/04 17:45:12', 'Admin', NULL, NULL, 1),
(77, NULL, '2017/05/04 17:51:16', 'Admin', NULL, NULL, 1),
(78, NULL, '2017/05/04 17:53:00', 'Admin', NULL, NULL, 1),
(79, NULL, '2017/05/04 18:12:49', 'Admin', NULL, NULL, 1),
(80, NULL, '2017/05/04 18:17:44', 'Admin', NULL, NULL, 1),
(81, NULL, '2017/05/05 13:02:17', 'Admin', NULL, NULL, 1),
(82, NULL, '2017/05/05 17:08:45', 'Admin', NULL, NULL, 1),
(83, NULL, '2017/05/05 17:38:43', 'Admin', NULL, NULL, 1),
(84, NULL, '2017/05/05 21:25:53', 'Admin', NULL, NULL, 1),
(85, NULL, '2017/05/06 20:41:56', 'Admin', NULL, NULL, 1),
(86, NULL, '2017/05/08 10:33:56', 'Admin', NULL, NULL, 1),
(87, NULL, '2017/05/08 17:11:57', 'Admin', NULL, NULL, 1),
(88, NULL, '2017/05/08 18:13:30', 'Admin', NULL, NULL, 1),
(89, NULL, '2017/05/10 12:32:08', 'Admin', NULL, NULL, 1),
(90, NULL, '2017/05/11 16:17:08', 'Admin', NULL, NULL, 1),
(91, NULL, '2017/05/12 10:26:33', 'Admin', NULL, NULL, 1),
(92, NULL, '2017/05/12 13:38:06', 'Admin', NULL, NULL, 1),
(93, NULL, '2017/05/13 23:15:01', 'Admin', NULL, NULL, 1),
(94, NULL, '2017/05/15 12:09:13', 'Admin', NULL, NULL, 1),
(95, NULL, '2017/05/15 15:12:26', 'Admin', NULL, NULL, 1),
(96, NULL, '2017/05/15 15:12:37', 'Admin', NULL, NULL, 1),
(97, NULL, '2017/05/16 13:54:01', 'Admin', NULL, NULL, 1),
(98, NULL, '2017/05/16 17:32:48', 'Admin', NULL, NULL, 1),
(99, NULL, '2017/05/17 14:26:22', 'Admin', NULL, NULL, 1),
(100, NULL, '2017/05/17 22:09:10', 'Admin', NULL, NULL, 1),
(101, NULL, '2017/05/18 13:06:50', 'Admin', NULL, NULL, 1),
(102, NULL, '2017/05/18 13:07:33', 'Admin', NULL, NULL, 1),
(103, NULL, '2017/05/18 13:07:37', 'Admin', NULL, NULL, 1),
(104, NULL, '2017/05/18 13:09:40', 'Admin', NULL, NULL, 1),
(105, NULL, '2017/05/19 10:48:54', 'Admin', NULL, NULL, 1),
(106, NULL, '2017/05/22 10:51:24', 'Admin', NULL, NULL, 1),
(107, NULL, '2017/05/22 14:58:13', 'Admin', NULL, NULL, 1),
(108, NULL, '2017/05/22 14:58:15', 'Admin', NULL, NULL, 1),
(109, NULL, '2017/05/23 12:25:24', 'Admin', NULL, NULL, 1),
(110, NULL, '2017/05/25 14:58:18', 'Admin', NULL, NULL, 1),
(111, NULL, '2017/05/29 12:31:51', 'Admin', NULL, NULL, 1),
(112, NULL, '2017/05/29 12:31:51', 'Admin', NULL, NULL, 1),
(113, NULL, '2017/06/06 16:02:34', 'Admin', NULL, NULL, 1),
(114, NULL, '2017/06/06 17:20:23', 'Admin', NULL, NULL, 1),
(115, NULL, '2017/06/07 12:19:19', 'Admin', NULL, NULL, 1),
(116, NULL, '2017/06/07 15:40:21', 'Admin', NULL, NULL, 1),
(117, NULL, '2017/06/08 10:13:25', 'Admin', NULL, NULL, 1),
(118, NULL, '2017/06/08 11:20:43', 'Admin', NULL, NULL, 1),
(119, NULL, '2017/06/08 14:52:53', 'Admin', NULL, NULL, 1),
(120, NULL, '2017/06/09 10:41:22', 'Admin', NULL, NULL, 1),
(121, NULL, '2017/06/09 13:08:33', 'Admin', NULL, NULL, 1),
(122, NULL, '2017/06/09 16:34:53', 'Admin', NULL, NULL, 1),
(123, NULL, '2017/06/12 12:00:05', 'Admin', NULL, NULL, 1),
(124, NULL, '2017/06/12 17:38:37', 'Admin', NULL, NULL, 1),
(125, NULL, '2017/06/16 12:27:53', 'Admin', NULL, NULL, 1),
(126, NULL, '2017/06/19 14:16:45', 'Admin', NULL, NULL, 1),
(127, NULL, '2017/06/19 14:34:04', 'Admin', NULL, NULL, 1),
(128, NULL, '2017/06/19 17:03:05', 'Admin', NULL, NULL, 1),
(129, NULL, '2017/06/19 17:59:19', 'Admin', NULL, NULL, 1),
(130, NULL, '2017/06/20 11:42:38', 'Admin', NULL, NULL, 1),
(131, NULL, '2017/06/20 17:00:49', 'Admin', NULL, NULL, 1),
(132, NULL, '2017/06/21 12:24:58', 'Admin', NULL, NULL, 1),
(133, NULL, '2017/06/21 13:48:06', 'Admin', NULL, NULL, 1),
(134, NULL, '2017/06/21 18:33:30', 'Admin', NULL, NULL, 1),
(135, NULL, '2017/06/21 21:46:07', 'Admin', NULL, NULL, 1),
(136, NULL, '2017/06/22 11:29:28', 'Admin', NULL, NULL, 1),
(137, NULL, '2017/06/27 12:29:12', 'Admin', NULL, NULL, 1),
(138, NULL, '2017/06/27 15:53:07', 'Admin', NULL, NULL, 1),
(139, NULL, '2017/06/27 15:56:34', 'Admin', NULL, NULL, 1),
(140, NULL, '2017/06/28 12:31:51', 'Admin', NULL, NULL, 1),
(141, NULL, '2017/06/28 16:12:05', 'Admin', NULL, NULL, 1),
(142, NULL, '2017/07/04 13:16:10', 'Admin', NULL, NULL, 1),
(143, NULL, '2017/07/05 11:39:07', 'Admin', NULL, NULL, 1),
(144, NULL, '2017/07/06 13:00:55', 'Admin', NULL, NULL, 1),
(145, NULL, '2017/07/06 23:53:06', 'Admin', NULL, NULL, 1),
(146, NULL, '2017/07/07 00:34:55', 'Admin', NULL, NULL, 1),
(147, NULL, '2017/07/07 11:52:02', 'Admin', NULL, NULL, 1),
(148, NULL, '2017/07/07 13:26:53', 'Admin', NULL, NULL, 1),
(149, NULL, '2017/07/07 15:21:42', 'Admin', NULL, NULL, 1),
(150, NULL, '2017/07/07 15:21:50', 'Admin', NULL, NULL, 1),
(151, NULL, '2017/07/07 16:14:30', 'Admin', NULL, NULL, 1),
(152, NULL, '2017/07/07 17:21:29', 'Admin', NULL, NULL, 1),
(153, NULL, '2017/07/07 19:36:48', 'Admin', NULL, NULL, 1),
(154, NULL, '2017/07/07 22:52:42', 'Admin', NULL, NULL, 1),
(155, NULL, '2017/07/08 00:11:01', 'Admin', NULL, NULL, 1),
(156, NULL, '2017/07/08 02:49:00', 'Admin', NULL, NULL, 1),
(157, NULL, '2017/07/08 04:04:22', 'Admin', NULL, NULL, 1),
(158, NULL, '2017/07/08 20:47:17', 'Admin', NULL, NULL, 1),
(159, NULL, '2017/07/09 01:08:00', 'Admin', NULL, NULL, 1),
(160, NULL, '2017/07/09 12:37:27', 'Admin', NULL, NULL, 1),
(161, NULL, '2017/07/09 21:15:32', 'Admin', NULL, NULL, 1),
(162, NULL, '2017/07/09 22:23:20', 'Admin', NULL, NULL, 1),
(163, NULL, '2017/07/11 12:38:29', 'Admin', NULL, NULL, 1),
(164, NULL, '2017/07/11 14:03:49', 'Admin', NULL, NULL, 1),
(165, NULL, '2017/07/12 11:48:59', 'Admin', NULL, NULL, 1),
(166, NULL, '2017/07/12 20:58:01', 'Admin', NULL, NULL, 1),
(167, NULL, '2017/07/13 12:18:45', 'Admin', NULL, NULL, 1),
(168, NULL, '2017/07/13 12:57:49', 'Admin', NULL, NULL, 1),
(169, NULL, '2017/07/13 13:15:29', 'Admin', NULL, NULL, 1),
(170, NULL, '2017/07/14 11:35:23', 'Admin', NULL, NULL, 1),
(171, NULL, '2017/07/14 16:35:27', 'Admin', NULL, NULL, 1),
(172, NULL, '2017/07/15 00:42:57', 'Admin', NULL, NULL, 1),
(173, NULL, '2017/07/15 03:16:12', 'Admin', NULL, NULL, 1),
(174, NULL, '2017/07/15 12:46:03', 'Admin', NULL, NULL, 1),
(175, NULL, '2017/07/15 12:51:09', 'Admin', NULL, NULL, 1),
(176, NULL, '2017/07/16 13:23:10', 'Admin', NULL, NULL, 1),
(177, NULL, '2017/07/16 15:49:52', 'Admin', NULL, NULL, 1),
(178, NULL, '2017/07/16 17:45:47', 'Admin', NULL, NULL, 1),
(179, NULL, '2017/07/17 00:02:49', 'Admin', NULL, NULL, 1),
(180, NULL, '2017/07/17 00:23:44', 'Admin', NULL, NULL, 1),
(181, NULL, '2017/07/17 11:08:47', 'Admin', NULL, NULL, 1),
(182, NULL, '2017/07/17 19:09:57', 'Admin', NULL, NULL, 1),
(183, NULL, '2017/07/17 22:18:37', 'Admin', NULL, NULL, 1),
(184, NULL, '2017/07/18 11:28:49', 'Admin', NULL, NULL, 1),
(185, NULL, '2017/07/18 16:37:28', 'Admin', NULL, NULL, 1),
(186, NULL, '2017/07/18 17:31:46', 'Admin', NULL, NULL, 1),
(187, NULL, '2017/07/18 22:06:16', 'Admin', NULL, NULL, 1),
(188, NULL, '2017/07/19 10:48:11', 'Admin', NULL, NULL, 1),
(189, NULL, '2017/07/20 10:38:19', 'Admin', NULL, NULL, 1),
(190, NULL, '2017/07/20 12:50:30', 'Admin', NULL, NULL, 1),
(191, NULL, '2017/07/20 22:59:11', 'Admin', NULL, NULL, 1),
(192, NULL, '2017/07/23 17:28:23', 'Admin', NULL, NULL, 1),
(193, NULL, '2017/07/23 19:32:44', 'Admin', NULL, NULL, 1),
(194, NULL, '2017/07/23 22:25:36', 'Admin', NULL, NULL, 1),
(195, NULL, '2017/07/23 22:29:02', 'Admin', NULL, NULL, 1),
(196, NULL, '2017/07/24 01:39:57', 'Admin', NULL, NULL, 1),
(197, NULL, '2017/07/24 17:06:21', 'Admin', NULL, NULL, 1),
(198, NULL, '2017/07/24 18:11:29', 'Admin', NULL, NULL, 1),
(199, NULL, '2017/07/24 19:04:40', 'Admin', NULL, NULL, 1),
(200, NULL, '2017/07/24 20:55:58', 'Admin', NULL, NULL, 1),
(201, NULL, '2017/07/25 17:09:35', 'Admin', NULL, NULL, 1),
(202, NULL, '2017/07/25 20:32:43', 'Admin', NULL, NULL, 1),
(203, NULL, '2017/07/25 20:36:00', 'Admin', NULL, NULL, 1),
(204, NULL, '2017/08/04 16:08:41', 'Admin', NULL, NULL, 1),
(205, NULL, '2017/08/05 01:13:06', 'Admin', NULL, NULL, 1),
(206, NULL, '2017/08/10 17:25:06', 'Admin', NULL, NULL, 1),
(207, NULL, '2017/08/10 19:10:14', 'Admin', NULL, NULL, 1),
(208, NULL, '2017/09/18 13:21:40', 'Admin', NULL, NULL, 1),
(209, NULL, '2017/09/18 18:24:07', 'Admin', NULL, NULL, 1),
(210, NULL, '2017/09/19 00:36:30', 'Admin', NULL, NULL, 1),
(211, NULL, '2017/09/19 11:42:09', 'Admin', NULL, NULL, 1),
(212, NULL, '2017/09/20 15:12:17', 'Admin', NULL, NULL, 1),
(213, NULL, '2017/10/20 14:41:47', 'Admin', NULL, NULL, 1),
(214, NULL, '2017/10/23 11:41:19', 'Admin', NULL, NULL, 1),
(215, NULL, '2017/10/23 13:58:35', 'Admin', NULL, NULL, 1),
(216, NULL, '2017/10/23 17:15:15', 'Admin', NULL, NULL, 1),
(217, NULL, '2017/10/23 18:51:00', 'Admin', NULL, NULL, 1),
(218, NULL, '2017/10/24 12:19:19', 'Admin', NULL, NULL, 1),
(219, NULL, '2017/10/24 16:46:34', 'Admin', NULL, NULL, 1),
(220, NULL, '2017/10/24 23:16:55', 'Admin', NULL, NULL, 1),
(221, NULL, '2017/10/26 15:44:38', 'Admin', NULL, NULL, 1),
(222, NULL, '2017/10/28 20:40:44', 'Admin', NULL, NULL, 1),
(223, NULL, '2017/10/31 16:52:46', 'Admin', NULL, NULL, 1),
(224, NULL, '2017/11/01 00:08:03', 'Admin', NULL, NULL, 1),
(225, NULL, '2017/11/08 18:28:24', 'Admin', NULL, NULL, 1),
(226, NULL, '2017/11/08 22:45:00', 'Admin', NULL, NULL, 1),
(227, NULL, '2017/11/10 14:35:22', 'Admin', NULL, NULL, 1),
(228, NULL, '2017/11/10 19:03:14', 'Admin', NULL, NULL, 1),
(229, NULL, '2017/11/10 19:05:30', 'Admin', NULL, NULL, 1),
(230, NULL, '2017/11/10 19:07:53', 'Admin', NULL, NULL, 1),
(231, NULL, '2017/11/10 19:17:46', 'Admin', NULL, NULL, 1),
(232, NULL, '2017/11/10 19:40:41', 'Admin', NULL, NULL, 1),
(233, NULL, '2017/11/13 10:33:26', 'Admin', NULL, NULL, 1),
(234, NULL, '2017/11/13 23:49:16', 'Admin', NULL, NULL, 1),
(235, NULL, '2017/11/14 00:23:07', 'Admin', NULL, NULL, 1),
(236, NULL, '2017/11/14 01:00:15', 'Admin', NULL, NULL, 1),
(237, NULL, '2017/11/14 12:56:45', 'Admin', NULL, NULL, 1),
(238, NULL, '2017/11/14 19:05:22', 'Admin', NULL, NULL, 1),
(239, NULL, '2017/11/14 23:25:59', 'Admin', NULL, NULL, 1),
(240, NULL, '2017/11/15 00:02:46', 'Admin', NULL, NULL, 1),
(241, NULL, '2017/11/15 00:27:35', 'Admin', NULL, NULL, 1),
(242, NULL, '2017/11/15 00:29:09', 'Admin', NULL, NULL, 1),
(243, NULL, '2017/11/15 00:29:26', 'Admin', NULL, NULL, 1),
(244, NULL, '2017/11/15 00:33:02', 'Admin', NULL, NULL, 1),
(245, NULL, '2017/11/15 00:35:51', 'Admin', NULL, NULL, 1),
(246, NULL, '2017/11/15 00:42:42', 'Admin', NULL, NULL, 1),
(247, NULL, '2017/11/15 00:42:45', 'Admin', NULL, NULL, 1),
(248, NULL, '2017/11/15 18:05:49', 'Admin', NULL, NULL, 1),
(249, NULL, '2017/11/16 15:16:23', 'Admin', NULL, NULL, 1),
(250, NULL, '2017/11/16 18:41:15', 'Admin', NULL, NULL, 1),
(251, NULL, '2017/11/16 19:14:03', 'Admin', NULL, NULL, 1),
(252, NULL, '2017/11/16 22:19:21', 'Admin', NULL, NULL, 1),
(253, NULL, '2017/11/16 22:21:36', 'Admin', NULL, NULL, 1),
(254, NULL, '2017/11/16 23:37:21', 'Admin', NULL, NULL, 1),
(255, NULL, '2017/11/17 13:29:10', 'Admin', NULL, NULL, 1),
(256, NULL, '2017/11/20 10:40:09', 'Admin', NULL, NULL, 1),
(257, NULL, '2017/11/20 18:25:48', 'Admin', NULL, NULL, 1),
(258, NULL, '2017/11/20 18:26:04', 'Admin', NULL, NULL, 1),
(259, NULL, '2017/11/20 21:37:20', 'Admin', NULL, NULL, 1),
(260, NULL, '2017/11/20 21:44:50', 'Admin', NULL, NULL, 3),
(261, NULL, '2017/11/20 21:45:18', 'Admin', NULL, NULL, 3),
(262, NULL, '2017/11/20 21:50:48', 'Admin', NULL, NULL, 1),
(263, NULL, '2017/11/21 00:05:28', 'Admin', NULL, NULL, 1),
(264, NULL, '2017/11/21 16:22:00', 'Admin', NULL, NULL, 1),
(265, NULL, '2017/11/21 17:48:41', 'Admin', NULL, NULL, 3),
(266, NULL, '2017/11/21 17:53:22', 'Admin', NULL, NULL, 3),
(267, NULL, '2017/11/25 01:16:52', 'Admin', NULL, NULL, 1),
(268, NULL, '2017/11/26 00:59:53', 'Admin', NULL, NULL, 1),
(269, NULL, '2017/12/05 13:58:37', 'Admin', NULL, NULL, 1),
(270, NULL, '2017/12/05 19:17:16', 'Admin', NULL, NULL, 1),
(271, NULL, '2017/12/05 20:50:57', 'Admin', NULL, NULL, 1),
(272, NULL, '2017/12/06 18:24:49', 'Admin', NULL, NULL, 1),
(273, NULL, '2017/12/06 18:39:12', 'Admin', NULL, NULL, 1),
(274, NULL, '2017/12/06 23:32:15', 'Admin', NULL, NULL, 1),
(275, NULL, '2017/12/06 23:39:43', 'Admin', NULL, NULL, 1),
(276, NULL, '2017/12/07 11:51:37', 'Admin', NULL, NULL, 4),
(277, NULL, '2017/12/08 14:13:16', 'Admin', NULL, NULL, 1),
(278, NULL, '2017/12/08 19:27:51', 'Admin', NULL, NULL, 1),
(279, NULL, '2017/12/11 13:35:00', 'Admin', NULL, NULL, 1),
(280, NULL, '2017/12/11 14:01:10', 'Admin', NULL, NULL, 1),
(281, NULL, '2017/12/12 13:31:40', 'Admin', NULL, NULL, 1),
(282, NULL, '2017/12/12 13:33:06', 'Admin', NULL, NULL, 1),
(283, NULL, '2017/12/13 14:47:29', 'Admin', NULL, NULL, 1),
(284, NULL, '2017/12/13 21:12:33', 'Admin', NULL, NULL, 1),
(285, NULL, '2017/12/14 19:32:34', 'Admin', NULL, NULL, 1),
(286, NULL, '2017/12/15 00:14:20', 'Admin', NULL, NULL, 1),
(287, NULL, '2017/12/21 14:55:55', 'Admin', NULL, NULL, 1),
(288, NULL, '2018/01/27 00:18:58', 'Admin', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `passwordDigest` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `passwordDigest`, `role`, `username`, `account_id`) VALUES
(1, 'test@email.com', '$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C', 'ADMIN', 'vikash', 3),
(2, 'vik', '$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C', 'admin1', 'vik', 3),
(3, 'user@gmail.com', '$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C', 'USER', 'user1', 3),
(4, 'user@gmail.com', '$2a$10$HrO7qJd57sIYAZ7d68CKa.hyeANQNmkLj8vUSnlvC/pjLOhm51G1C', 'ADMIN', 'firepie', 3);

-- --------------------------------------------------------

--
-- Table structure for table `workflow`
--

CREATE TABLE `workflow` (
  `id` bigint(20) NOT NULL,
  `WorkflowName` varchar(255) DEFAULT NULL,
  `schedule_id` bigint(20) NOT NULL,
  `schedulestatus` bit(1) NOT NULL,
  `Workjson` text,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workflow`
--

INSERT INTO `workflow` (`id`, `WorkflowName`, `schedule_id`, `schedulestatus`, `Workjson`, `user_id`) VALUES
(20, 'workflow 1', 3, b'0', NULL, 1),
(22, 'Workflow 2', 3, b'0', NULL, 1),
(23, 'workflow', 3, b'0', NULL, 1),
(24, 'Workflow process 1', 3, b'0', NULL, 1),
(25, 'workflow', 3, b'0', NULL, 1),
(26, 'Worflow Flood', 4, b'0', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `workflowdata`
--

CREATE TABLE `workflowdata` (
  `id` int(20) NOT NULL,
  `workflowid` bigint(20) DEFAULT NULL,
  `startdate` varchar(255) DEFAULT NULL,
  `enddate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `workflowdata`
--

INSERT INTO `workflowdata` (`id`, `workflowid`, `startdate`, `enddate`) VALUES
(1, 11, '10.1.100', '12.11.2017');

-- --------------------------------------------------------

--
-- Table structure for table `workflowdependent`
--

CREATE TABLE `workflowdependent` (
  `id` bigint(20) NOT NULL,
  `PredecessorId` bigint(20) DEFAULT NULL,
  `SequenceId` bigint(20) DEFAULT NULL,
  `SuccessorId` bigint(20) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `start` bit(1) DEFAULT NULL,
  `end` bit(1) DEFAULT NULL,
  `job_id` bigint(20) DEFAULT NULL,
  `workflow_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workflowdependent`
--

INSERT INTO `workflowdependent` (`id`, `PredecessorId`, `SequenceId`, `SuccessorId`, `active`, `start`, `end`, `job_id`, `workflow_id`) VALUES
(10, 1, 1, 3, b'1', b'1', b'0', 133, 20),
(11, 3, 2, 4, b'1', b'0', b'0', 135, 20),
(12, 4, 3, 5, b'1', b'0', b'1', 136, 20),
(13, 1, 1, 3, b'1', b'1', b'0', 135, 22),
(14, 3, 2, 4, b'1', b'0', b'1', 137, 22),
(15, 1, 1, 3, b'1', b'1', b'1', 138, 23),
(16, 1, 1, 3, b'1', b'1', b'0', 133, 24),
(17, 3, 2, 4, b'1', b'0', b'0', 135, 24),
(18, 4, 3, 5, b'1', b'0', b'1', 136, 24),
(19, 1, 1, 3, b'1', b'1', b'1', 158, 25),
(20, 1, 1, 3, b'1', b'1', b'1', 163, 26);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `awscredentials`
--
ALTER TABLE `awscredentials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_lc4n7ov2q9bij2h3pu7nec3bb` (`user_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f6wc0hkq61akead88inm3ly9` (`source_id`),
  ADD KEY `FK_iwfsk3nwu3go37j9wr1kbys12` (`Source_Type`),
  ADD KEY `FK_9axwovp7xv0xjr09xulgoqed7` (`target_id`),
  ADD KEY `FK_6axwuadjv08lhomo3hggb4jfm` (`Target_Type`),
  ADD KEY `FK_853123sdftqk53rw3ogqaftsj` (`user_id`),
  ADD KEY `FK_2bhl4k4bu5paxbhwccyrb1te6` (`jobType_id`);

--
-- Indexes for table `jobdependent`
--
ALTER TABLE `jobdependent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_go3p8vfcvyoac24k68u48awt3` (`job_id`);

--
-- Indexes for table `jobmetadata`
--
ALTER TABLE `jobmetadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobtype`
--
ALTER TABLE `jobtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `servercredentials`
--
ALTER TABLE `servercredentials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3tp0i95x1ml9kbfuyxuw61cxy` (`servertype_id`),
  ADD KEY `FK_nk131a8avo8c7436p9aogtp4v` (`user_id`);

--
-- Indexes for table `servertype`
--
ALTER TABLE `servertype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `twitterkafka`
--
ALTER TABLE `twitterkafka`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userlog`
--
ALTER TABLE `userlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6fi8v6xi17o78u1vpiqk23w18` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_mqvdk3f641ktw1w266kl1ynev` (`account_id`);

--
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3clh0iopujevqduw1ri7jrt88` (`user_id`),
  ADD KEY `fk_schedules` (`schedule_id`);

--
-- Indexes for table `workflowdata`
--
ALTER TABLE `workflowdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workflowdependent`
--
ALTER TABLE `workflowdependent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8mg7ehy84x9p34jvhneu7xt1s` (`job_id`),
  ADD KEY `FK_kk4gb4vbc21g4f451txfvrfxs` (`workflow_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `awscredentials`
--
ALTER TABLE `awscredentials`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;
--
-- AUTO_INCREMENT for table `jobdependent`
--
ALTER TABLE `jobdependent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT for table `jobmetadata`
--
ALTER TABLE `jobmetadata`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jobtype`
--
ALTER TABLE `jobtype`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `servercredentials`
--
ALTER TABLE `servercredentials`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `servertype`
--
ALTER TABLE `servertype`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `twitterkafka`
--
ALTER TABLE `twitterkafka`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `userlog`
--
ALTER TABLE `userlog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `workflow`
--
ALTER TABLE `workflow`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `workflowdata`
--
ALTER TABLE `workflowdata`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `workflowdependent`
--
ALTER TABLE `workflowdependent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `awscredentials`
--
ALTER TABLE `awscredentials`
  ADD CONSTRAINT `FK_lc4n7ov2q9bij2h3pu7nec3bb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `FK_2bhl4k4bu5paxbhwccyrb1te6` FOREIGN KEY (`jobType_id`) REFERENCES `jobtype` (`id`),
  ADD CONSTRAINT `FK_6axwuadjv08lhomo3hggb4jfm` FOREIGN KEY (`Target_Type`) REFERENCES `servertype` (`id`),
  ADD CONSTRAINT `FK_853123sdftqk53rw3ogqaftsj` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK_9axwovp7xv0xjr09xulgoqed7` FOREIGN KEY (`target_id`) REFERENCES `servercredentials` (`id`),
  ADD CONSTRAINT `FK_f6wc0hkq61akead88inm3ly9` FOREIGN KEY (`source_id`) REFERENCES `servercredentials` (`id`),
  ADD CONSTRAINT `FK_iwfsk3nwu3go37j9wr1kbys12` FOREIGN KEY (`Source_Type`) REFERENCES `servertype` (`id`);

--
-- Constraints for table `jobdependent`
--
ALTER TABLE `jobdependent`
  ADD CONSTRAINT `FK_go3p8vfcvyoac24k68u48awt3` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `servercredentials`
--
ALTER TABLE `servercredentials`
  ADD CONSTRAINT `FK_3tp0i95x1ml9kbfuyxuw61cxy` FOREIGN KEY (`servertype_id`) REFERENCES `servertype` (`id`),
  ADD CONSTRAINT `FK_nk131a8avo8c7436p9aogtp4v` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `userlog`
--
ALTER TABLE `userlog`
  ADD CONSTRAINT `FK_6fi8v6xi17o78u1vpiqk23w18` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_mqvdk3f641ktw1w266kl1ynev` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workflow`
--
ALTER TABLE `workflow`
  ADD CONSTRAINT `FK_3clh0iopujevqduw1ri7jrt88` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_schedules` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`);

--
-- Constraints for table `workflowdependent`
--
ALTER TABLE `workflowdependent`
  ADD CONSTRAINT `FK_8mg7ehy84x9p34jvhneu7xt1s` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`),
  ADD CONSTRAINT `FK_kk4gb4vbc21g4f451txfvrfxs` FOREIGN KEY (`workflow_id`) REFERENCES `workflow` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
