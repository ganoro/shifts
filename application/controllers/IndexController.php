<?php

class Shifts extends Zend_Db_Table_Abstract {
	protected $_name = 'shifts';
}

class IndexController extends Zend_Controller_Action {
	
	protected $options;
	protected $db;
	
	
	public function init() {
		// monitore
		zend_monitor_set_aggregation_hint(rand());
		
		// database
		$this->options = array ('host' => getDbHost (), 'username' => getDbUser (), 'password' => getDbPassword (), 'dbname' => getDbName () );
		$this->db = Zend_Db::factory ( 'PDO_MYSQL', $this->options );
		Zend_Db_Table_Abstract::setDefaultAdapter($this->db);
		
		// month setting
		$this->month = $this->getRequest ()->getParam ( "month" );
		if (! $this->month) {
			$this->month = date ( "m" );
		}
	}
	
	public function indexAction() {

	}
	
	public function reportshiftAction() {
		$data = array(
				'date'      => date("Y-m-d"),
				'type' => 'shift',
				'comments'      => ''
		);
		$table = new Shifts($this->db);
		try {
			$insert = $table->insert($data);
		} catch (Exception $e) {
		}
		die(0);
	}
	
	public function reportsessionAction() {
		$data = array(
				'date'      => date("Y-m-d"),
				'type' => 'shift',
				'comments'      => ''
		);
		$table = new Shifts($this->db);
		try {
			$insert = $table->insert($data);
		} catch (Exception $e) {
		}
		die(0);
	}
	
	public function removeAction() {
		$data = array(
				'date'      => date("Y-m-d"),
		);
		$table = new Shifts($this->db);
		try {
			$insert = $table->delete($data);
		} catch (Exception $e) {
		}
		die(0);
	}
	
	public function listAction() {
		$select = $this->db->select ()->from ( "shifts" )->where ( "MONTH(date) = $this->month" );
		$stmt = $this->db->query ( $select );
		$result = $stmt->fetchAll ();
		echo json_encode ( $result );
		die ( 0 );
	}
}

/**
 *
 * @return string the container db host
 */
function getDbHost() {
	return get_cfg_var ( 'zend_developer_cloud.db.host' );
}

/**
 *
 * @return string the container db name
 */
function getDbName() {
	return get_cfg_var ( 'zend_developer_cloud.db.name' );
}

/**
 *
 * @return string the container db user
 */
function getDbUser() {
	return get_cfg_var ( 'zend_developer_cloud.db.username' );
}

/**
 *
 * @return string the container db password
 */
function getDbPassword() {
	return get_cfg_var ( 'zend_developer_cloud.db.password' );
}
