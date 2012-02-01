<?php
require_once 'Db/Settings.php';

class Shifts extends Zend_Db_Table_Abstract {
	protected $_name = 'shifts';
}

class IndexController extends Zend_Controller_Action {
	
	protected $options;
	protected $db;
	
	public function init() {
		// monitore
		zend_monitor_set_aggregation_hint ( rand () );
		
		// database
		$this->options = array ('host' => getDbHost (), 'username' => getDbUser (), 'password' => getDbPassword (), 'dbname' => getDbName () );
		$this->db = Zend_Db::factory ( 'PDO_MYSQL', $this->options );
		Zend_Db_Table_Abstract::setDefaultAdapter ( $this->db );
		
		$this->month = $this->getRequest ()->getParam ( "m" );
		$this->year = $this->getRequest ()->getParam ( "y" );
		if (! $this->month) {
			$this->month = date ( "m" );
			$this->year = date ( "Y" );
		}
		$this->view->month = $this->month;
		$this->view->year = $this->year;
	}
	
	public function indexAction() {
	}
	
	public function insertAction() {
	}
	
	public function updateAction() {
	}
	
	public function reportshiftAction() {
		$this->addRecord ( "shift" );
	}
	
	public function reportsessionAction() {
		$this->addRecord ( "session" );
	
	}
	/**
	 */
	private function addRecord($type) {
		$y = $this->getRequest ()->getParam ( "y" );
		$m = $this->getRequest ()->getParam ( "m" );
		$d = $this->getRequest ()->getParam ( "d" );
		$u = $this->getRequest ()->getParam ( "u" );
		$c = $this->getRequest ()->getParam ( "c" );
		
		$data = array ('date' => $y . '-' . $m . '-' . $d, 'type' => $type, 'comments' => $c, 'user_id' => $u);
		$table = new Shifts ( $this->db );
		$insert = $table->insert ( $data );
		echo $insert;
		die ( 0 );
	}
	
	public function deleteAction() {
		$y = $this->getRequest ()->getParam ( "y" );
		$m = $this->getRequest ()->getParam ( "m" );
		$d = $this->getRequest ()->getParam ( "d" );
		
		$table = new Shifts ( $this->db );
		try {
			$where = $table->getAdapter ()->quoteInto ( 'date = ?', $y . '-' . $m . '-' . $d );
			$table->delete ( $where );
		} catch ( Exception $e ) {
		}
		die ( 0 );
	}
	
	public function editAction() {
		$y = $this->getRequest ()->getParam ( "y" );
		$m = $this->getRequest ()->getParam ( "m" );
		$d = $this->getRequest ()->getParam ( "d" );
		$c = $this->getRequest ()->getParam ( "c" );
		
		$table = new Shifts ( $this->db );
		try {
			$data = array ('comments' => $c );
			$where = $table->getAdapter ()->quoteInto ( 'date = ?', $y . '-' . $m . '-' . $d );
			$table->update ( $data, $where );
		} catch ( Exception $e ) {
		}
		die ( 0 );
	}
	
	public function listAction() {
		$m = $this->getRequest ()->getParam ( "m" );
		$y = $this->getRequest ()->getParam ( "y" );
		$uid = $this->getRequest ()->getParam ( "uid" );
		if (! $m) {
			$m = date ( "m" );
			$y = date ( "Y" );
		}
		if (! $uid) {
			echo json_encode ( array () );
			die ( 0 );
		}
		$select = $this->db->select ()->from ( "shifts" )->where ( "MONTH(date) = $this->month" )->where ( "YEAR(date) = $y" )->where ( "user_id = $uid" );
		$stmt = $this->db->query ( $select );
		$result = $stmt->fetchAll ();
		echo json_encode ( $result );
		die ( 0 );
	}
	
	public function infoAction() {
		$y = $this->getRequest ()->getParam ( "y" );
		$m = $this->getRequest ()->getParam ( "m" );
		$d = $this->getRequest ()->getParam ( "d" );
		
		$select = $this->db->select ()->from ( "shifts" )->where ( "date = '$y-$m-$d'" );
		$stmt = $this->db->query ( $select );
		$result = $stmt->fetchAll ();
		echo json_encode ( $result );
		die ( 0 );
	}
}

